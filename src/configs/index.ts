import dotenv from 'dotenv';
import path from 'path';

// dotenv.config();
dotenv.config({ path: path.join(__dirname, '../../', `.env.${process.env.NODE_ENV}`) });
