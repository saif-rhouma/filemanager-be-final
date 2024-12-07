import multer from 'multer';
import path from 'path';
import TinyID from '../../utils/tinyID';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    const fileName = `${TinyID(10)}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

const Uploader = multer({ storage });

export default Uploader;
