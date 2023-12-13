import { Media } from '@payloadTypes';

export const generateS3FileURL = (file: Media) => {
  const encodedFilename = encodeURIComponent(file.filename || '').replace(
    /%20/g,
    '+',
  );
  const bucketURL = `https://praxis-user-uploads.s3.amazonaws.com`;
  return `${bucketURL}/${encodedFilename}`;
};
