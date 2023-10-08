import React from 'react';
type FormErrorProps = {
  message: string | null;
};

export const FormInputError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return <span className="text-orange-600 mt-1 text-sm">{`*${message}`}</span>;
};
