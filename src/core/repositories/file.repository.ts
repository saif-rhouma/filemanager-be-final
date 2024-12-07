import AppDataSource from '../../database/data-source';
import { File } from '../models/file.model';
import BaseRepository from './baseRepository';

class FileRepository extends BaseRepository<File> {
  constructor() {
    super(AppDataSource.getRepository(File));
  }

  findByUser(userId: string) {
    return this.repo.find({ where: { createdBy: { id: userId } }, relations: { tags: true } });
  }

  findByFilename(filename: string) {
    return this.repo.find({ where: { filename } });
  }
}

export default new FileRepository();
