'use client';

import { Media } from '@payloadTypes';
// ProjectFormContext.js
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ProjectFormContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  submitErrors: string[];
  setSubmitErrors: React.Dispatch<React.SetStateAction<string[]>>;
  stagedForRemoval: string[];
  stageForRemoval: (mediaId: string) => void;
  undoStageForRemoval: (mediaId: string) => void;
  filterStagedForRemoval: (mediaArray: Media[]) => Media[];
}

export const ProjectFormContext = createContext<ProjectFormContextType | null>(
  null,
);

export const useProjectForm = () => useContext(ProjectFormContext);

export const ProjectFormProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [stagedForRemoval, setStagedForRemoval] = useState<string[]>([]);

  const stageForRemoval = (mediaId: string) => {
    setStagedForRemoval((prev) => [...prev, mediaId]);
  };

  const undoStageForRemoval = (mediaId: string) => {
    setStagedForRemoval((prev) => prev.filter((id) => id !== mediaId));
  };

  const filterStagedForRemoval = (mediaArray: Media[]) => {
    return mediaArray.filter((media) => !stagedForRemoval.includes(media.id));
  };

  const value = {
    loading,
    setLoading,
    success,
    setSuccess,
    submitErrors,
    setSubmitErrors,
    stagedForRemoval,
    stageForRemoval,
    undoStageForRemoval,
    filterStagedForRemoval,
  };

  return (
    <ProjectFormContext.Provider value={value}>
      {children}
    </ProjectFormContext.Provider>
  );
};
