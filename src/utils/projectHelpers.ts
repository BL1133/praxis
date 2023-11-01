import { Project } from '@payloadTypes';
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

function filterValidLinks(links: Project['links']) {
  return links?.filter((link) => link?.link?.trim() !== '') || [];
}

async function getUploadedMediaIds(
  files: ProjectInputs['file'],
): Promise<UploadResults> {
  const filesArr = Array.from(files || []);

  if (filesArr?.length) {
    return await uploadMedia(filesArr);
  }
  return { success: [], failures: [] };
}

async function uploadMedia(files: File[]): Promise<UploadResults> {
  const results: UploadResults = {
    success: [],
    failures: [],
  };

  const uploadPromises = files.map(async (file) => {
    console.log(file);
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

  return results;
}

// Exported functions for use in pages ==============================================================

export async function uploadMediaAndGetSubmitData(
  inputs: ProjectInputs,
  setSubmitErrors: React.Dispatch<React.SetStateAction<string[]>>,
) {
  // Handle media upload
  const { success, failures } = await getUploadedMediaIds(inputs.file);
  console.log(success, failures);
  // If there are any failures, set the submitErrors state and log the error to the console
  if (failures.length > 0) {
    failures.forEach((failure) => {
      setSubmitErrors((prev) => [...prev, failure.error.message]);
      console.error(
        `Failed to upload ${failure.fileName}: ${failure.error.message}`,
      );
    });
  }
  const mediaIds: string[] = success;
  const filteredLinks = filterValidLinks(inputs.links);
  const projectData: ProjectInputs = {
    ...inputs,
    ...(filteredLinks.length && { links: filteredLinks }),
    ...(mediaIds.length && { media: mediaIds }),
  };
  return projectData;
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
  console.log(inputs);
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
