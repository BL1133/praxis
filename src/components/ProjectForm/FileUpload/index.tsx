import { FileInput, Label } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
  fileRef: UseFormRegisterReturn;
  loading: boolean;
  success: boolean | null;
};

export const FileUpload: React.FC<FileUploadProps> = ({
  fileRef,
  loading,
  success,
}) => {
  return (
    <div className="max-w-md flex flex-col justify-center" id="fileUpload">
      <div className="mb-2 block">
        <Label className="text-md" htmlFor="file" value="Upload files" />
      </div>
      <FileInput
        accept="image/*,application/pdf"
        disabled={loading || success ? true : false}
        {...fileRef}
        helperText="Add a maximum of 3 files to your project. PDF or image files only."
        id="file"
        multiple
      />
    </div>
  );
};