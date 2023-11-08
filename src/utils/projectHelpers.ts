import { Media, Project } from '@payloadTypes';
import { ProjectInputs, ProjectResponse } from 'types';

import { handleApiResponse } from '@/utils/apiErrors';

interface UploadError {
  fileName: string;
  error: Error;
}

interface DeleteError {
  error: Error;
}

interface UploadResults {
  success: string[];
  failures: UploadError[];
}
interface DeleteResults {
  success: string[];
  failures: DeleteError[];
}

function filterValidLinks(links: Project['links']) {
  const filtered = links?.filter((link) => link?.url?.trim() !== '') || [];
  return filtered.length > 0 ? filtered : null;
}

async function uploadMedia(
  files: File[],
  id: string = '',
): Promise<UploadResults> {
  const results: UploadResults = {
    success: [],
    failures: [],
  };

  const uploadPromises = files.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/media`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(
          responseBody.errors[0].message ||
            `Failed to upload file: ${file.name}`,
        );
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

async function getUploadedMediaIds(
  files: ProjectInputs['file'],
  id: string = '',
): Promise<UploadResults> {
  const filesArr = Array.from(files || []);

  if (filesArr?.length) {
    return await uploadMedia(filesArr, id);
  }
  return { success: [], failures: [] };
}

// Exported functions for use in pages ==============================================================

export async function uploadMediaAndGetSubmitData(
  inputs: ProjectInputs,
  setSubmitErrors: React.Dispatch<React.SetStateAction<string[]>>,
  id: string = '',
): Promise<ProjectInputs> {
  let uploadedMediaIds: string[] = [];
  let failures: UploadError[] = [];

  try {
    const results = await getUploadedMediaIds(inputs.file, id);
    uploadedMediaIds = results.success;
    failures = results.failures;

    if (failures.length > 0) {
      const failureMessages = failures.map((f) => f.error.message).join(', ');
      throw new Error(`Failed to upload media: ${failureMessages}`);
    }

    const existingMediaIds =
      (inputs.media as Media[])?.map((media) => media.id) || [];
    const updatedMediaIds = [...existingMediaIds, ...uploadedMediaIds];
    const filteredLinks = filterValidLinks(inputs.links);
    const updatedInputs = {
      ...inputs,
      media: updatedMediaIds,
    };
    console.log(filteredLinks);
    if (filteredLinks) {
      updatedInputs.links = filteredLinks;
    } else {
      updatedInputs.links = [];
    }
    return updatedInputs;
  } catch (error) {
    console.error(error);
    setSubmitErrors((prev) => [...prev, (error as Error).message]);
    throw error;
  }
}

export async function removeFileFromMediaCollection(media: string[]) {
  const results: DeleteResults = {
    success: [],
    failures: [],
  };

  const deletePromises = media.map(async (mediaId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/media/${mediaId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        // If the response is not OK, throw an error.
        const responseBody = await response.json();
        throw new Error(
          responseBody.errors[0].message ||
            `Failed to remove file. Please try again.`,
        );
      }

      results.success.push(mediaId);
    } catch (error) {
      results.failures.push({ error: error as Error });
    }
  });

  await Promise.all(deletePromises);

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
  // console.log(inputs);
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
  console.log('resData', resData);

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
