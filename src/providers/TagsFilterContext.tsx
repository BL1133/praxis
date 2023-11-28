'use client';

// ProjectFormContext.js
import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  FieldErrors,
  useForm,
  UseFormHandleSubmit,
  UseFormRegisterReturn,
} from 'react-hook-form';

interface TagsFilterContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean | null;
  setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
  submitErrors: string[];
  setSubmitErrors: React.Dispatch<React.SetStateAction<string[]>>;
  tagsRef: UseFormRegisterReturn<'tags'>;
  handleSubmit: UseFormHandleSubmit<TagsFormInputs, undefined>;
  errors: FieldErrors<TagsFormInputs>;
}

type TagsFormInputs = {
  tags: string[]; // Assuming tags are an array of strings
};

export const TagsFilterContext = createContext<TagsFilterContextType>(
  {} as TagsFilterContextType,
);

export const TagsFilterProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [submitErrors, setSubmitErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagsFormInputs>();

  const tagsRef = register('tags');

  const value = {
    loading,
    setLoading,
    success,
    setSuccess,
    submitErrors,
    setSubmitErrors,
    tagsRef,
    handleSubmit,
    errors,
  };

  return (
    <TagsFilterContext.Provider value={value}>
      {children}
    </TagsFilterContext.Provider>
  );
};

export function useTagsFilterContext(): TagsFilterContextType {
  const context = useContext(TagsFilterContext);

  if (context === undefined) {
    throw new Error(
      'useTagsFilterContext must be used within a TagsFilterProvider',
    );
  }

  return context;
}
