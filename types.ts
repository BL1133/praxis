import { Project } from '@payloadTypes';

export interface GetProjectsResponse {
  docs: Project[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export type ProjectResponse = {
  message: string;
  doc: Project;
};

// This is omitting the fields that are not needed for the client
// ProjectInputs is an extension of the Project type from Payload
type ProjectOmit = Omit<
  Project,
  'createdAt' | 'updatedAt' | 'id' | 'createdBy' | 'status'
>;

export interface ProjectInputs extends ProjectOmit {
  file?: FileList;
}
