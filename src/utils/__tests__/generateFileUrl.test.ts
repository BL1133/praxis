const { generateS3FileURL } = require('../generateFileUrl');

describe('generateS3FileURL', () => {
  it('should correctly encode and format the URL for a given filename', () => {
    const file = {
      id: '6579d55b1c6e5d5d9318c593',
      filename: 'example file.jpg',
      createdAt: '2023-12-13T16:01:31.388Z',
      updatedAt: '2023-12-13T16:01:31.388Z',
    };
    const result = generateS3FileURL(file);
    expect(result).toBe(
      'https://praxis-user-uploads.s3.amazonaws.com/example+file.jpg',
    );
  });

  it('should handle filenames with special characters', () => {
    const file = {
      id: '6579d55b1c6e5d5d9318c593',
      filename: 'example@#$.jpg',
      createdAt: '2023-12-13T16:01:31.388Z',
      updatedAt: '2023-12-13T16:01:31.388Z',
    };
    const result = generateS3FileURL(file);
    expect(result).toBe(
      'https://praxis-user-uploads.s3.amazonaws.com/example%40%23%24.jpg',
    );
  });

  it('should return just the bucket URL if the filename is empty', () => {
    const file = {
      id: '6579d55b1c6e5d5d9318c593',
      filename: '',
      createdAt: '2023-12-13T16:01:31.388Z',
      updatedAt: '2023-12-13T16:01:31.388Z',
    };
    const result = generateS3FileURL(file);
    expect(result).toBe('https://praxis-user-uploads.s3.amazonaws.com/');
  });
});
