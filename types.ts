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

export type Inputs = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  file: FileList;
  skillsWanted: { role: 'Maintainer' | 'Mentor' | 'Developer' | 'Designer' }[];
  links: [string, string, string];
};

export type ProjectResponse = {
  message: string;
  doc: Project;
};
