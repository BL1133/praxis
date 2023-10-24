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

type ProjectFormInputs = Omit<
  Project,
  'createdAt' | 'updatedAt' | 'id' | 'createdBy' | 'status'
>;

export interface ProjectInputs extends ProjectFormInputs {
  file?: FileList;
  media?: string[];
}
