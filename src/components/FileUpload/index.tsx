import { FileInput, Label } from 'flowbite-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function FileUpload() {
  const { control } = useForm();

  return (
    <div className="max-w-md" id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload files" />
      </div>
      <Controller
        name="file"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FileInput
            {...field}
            helperText="Add multiple files for your project"
            id="file"
            multiple
          />
        )}
      />
    </div>
  );
}
