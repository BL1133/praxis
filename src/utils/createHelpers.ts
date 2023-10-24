import { ProjectInputs, ProjectResponse } from 'types';

import { handleApiResponse } from '@/utils/apiErrors';

type FailedUploadType = { fileName: string; error: Error };
type UploadResults = {
  success: string[];
  failures: FailedUploadType[];
};

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
      console.error(
        `Error uploading file: ${file.name}. Please try again`,
        error,
      );
      results.failures.push({ fileName: file.name, error: error as Error });
    }
  });
  await Promise.all(uploadPromises);
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
