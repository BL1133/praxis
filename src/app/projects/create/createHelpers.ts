import { Inputs, ProjectResponse } from 'types';

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
      console.error(`Error uploading file: ${file.name}`, error);
      results.failures.push({ fileName: file.name, error: error as Error });
    }
  });
  await Promise.all(uploadPromises);
  return results;
}

export async function createProject(
  projectData: Omit<Inputs, 'file'>,
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
    throw new Error(resData.error || 'Failed to create project.');
  }
  return resData;
}
