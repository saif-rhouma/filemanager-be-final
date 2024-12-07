import { FileType } from '../core/models/file.model';

const getFileType = (file: string) => {
  if (file.startsWith('image/')) {
    return FileType.Image;
  } else if (file.startsWith('video/')) {
    return FileType.Video;
  }

  return FileType.Unknown;
};
export default getFileType;
