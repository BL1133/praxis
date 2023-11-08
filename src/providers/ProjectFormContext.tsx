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
  isSubmitModalOpen: boolean;
  setIsSubmitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleted: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProjectFormContext = createContext<ProjectFormContextType>(
  {} as ProjectFormContextType,
);

export const ProjectFormProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);
  const [stagedForRemoval, setStagedForRemoval] = useState<string[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // for submiModal message

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
    isSubmitModalOpen,
    setIsSubmitModalOpen,
    isConfirmModalOpen,
    setIsConfirmModalOpen,
    isDeleted,
    setIsDeleted,
  };

  return (
    <ProjectFormContext.Provider value={value}>
      {children}
    </ProjectFormContext.Provider>
  );
};

export function useProjectFormContext(): ProjectFormContextType {
  const context = useContext(ProjectFormContext);

  if (context === undefined) {
    throw new Error(
      'useProjectFormContext must be used within a ProjectFormProvider',
    );
  }

  return context;
}
