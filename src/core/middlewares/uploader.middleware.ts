import multer from 'multer';
import path from 'path';
import TinyID from '../../utils/tinyID';
import { ALLOWED_MIME_TYPES, MAX_SIZE } from '../../configs/fileUpload';
import InvalidFileTypeException from '../exceptions/invalidFileType.exception';
import { MSG_EXCEPTION } from '../constants/messages';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    const fileName = `${TinyID(10)}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

// File validation for images and videos
const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new InvalidFileTypeException(MSG_EXCEPTION.INVALID_INPUT_FILE), false);
  }
};

const Uploader = multer({ storage, fileFilter, limits: { fileSize: MAX_SIZE } });

export default Uploader;
