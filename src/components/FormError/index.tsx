import React from 'react';
type FormErrorProps = {
  message: string | null;
};

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return <span className="text-orange-600 mt-1 text-sm">{`*${message}`}</span>;
};
