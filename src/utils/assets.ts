export const getMediaType = ({ ...props }) => {
  const { searchParams } = props;
  const type = searchParams.get('mediaType');

  switch (type) {
    case 'images':
      return 'images';
    case 'videos':
      return 'videos';
    default:
      return 'images';
  }
};

export const baseUploadPath = '/api/assets/upload-asset';
export const baseDownloadPath = '/api/assets/get-asset';

export const getImageUrl = (src: string) => {
  return `${baseDownloadPath}?path=${src}`;
};
