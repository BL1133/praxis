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
  brand: string;
  price: number;
  category: string;
  itemWeight: number;
  description: string;
  file: FileList;
};

export type ProjectResponse = {
  message: string;
  doc: Project;
};
