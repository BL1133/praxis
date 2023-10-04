import { FileInput, Label } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
  fileRef: UseFormRegisterReturn;
};

export const FileUpload: React.FC<FileUploadProps> = ({ fileRef }) => {
  return (
    <div className="max-w-md" id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload files" />
      </div>
      <FileInput
        {...fileRef}
        helperText="Add multiple files for your project"
        id="file"
        multiple
      />
    </div>
  );
};
