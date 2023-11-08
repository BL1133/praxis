import { FileInput, Label } from 'flowbite-react';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { useProjectFormContext } from '@/providers/ProjectFormContext';

type FileUploadProps = {
  fileRef: UseFormRegisterReturn;
};

export const FileUpload: React.FC<FileUploadProps> = ({ fileRef }) => {
  const { loading, success } = useProjectFormContext();
  return (
    <div className="max-w-md flex flex-col justify-center" id="fileUpload">
      <div className="mb-2 block">
        <Label className="text-md" htmlFor="file" value="Upload files" />
      </div>
      <FileInput
        accept="image/*,application/pdf"
        disabled={loading || success ? true : false}
        {...fileRef}
        // helperText="PDF or image files only. 50 MB quota per project."
        id="file"
        multiple
      />
    </div>
  );
};
