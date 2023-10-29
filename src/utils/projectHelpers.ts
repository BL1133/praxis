import { ProjectInputs, ProjectResponse } from 'types';

import { handleApiResponse } from '@/utils/apiErrors';

interface UploadError {
  fileName: string;
  error: Error;
}

interface UploadResults {
  success: string[];
  failures: UploadError[];
}

export async function uploadMedia(files: File[]): Promise<UploadResults> {
  const results: UploadResults = {
    success: [],
    failures: [],
  };

  const uploadPromises = files.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/media`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${file.name}`);
      }

      const uploadResult = await response.json();
      results.success.push(uploadResult.doc.id);
    } catch (error) {
      results.failures.push({ fileName: file.name, error: error as Error });
    }
  });

  await Promise.all(uploadPromises);

  if (results.failures.length) {
    results.failures.forEach((failure) => {
      console.error(
        `Failed to upload ${failure.fileName}: ${failure.error.message}`,
      );
    });
    throw new Error('Media upload failed.');
  }

  return results;
}

export async function createProject(
  projectData: ProjectInputs,
): Promise<ProjectResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
    credentials: 'include',
  });
  const resData = await res.json();

  if (!res.ok) {
    handleApiResponse(res);
  }
  return resData;
}

export async function editProject(
  inputs: ProjectInputs,
  id: string,
): Promise<ProjectResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
      credentials: 'include',
    },
  );

  const resData = await res.json();

  if (!res.ok) {
    handleApiResponse(res);
  }
  return resData;
}

export async function deleteProject(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/projects/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );
  const resData = await res.json();

  if (!res.ok) {
    handleApiResponse(res);
  }
  return resData;
}
