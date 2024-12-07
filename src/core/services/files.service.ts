import { MSG_EXCEPTION } from '../constants/messages';
import { File } from '../models/file.model';
import filesRepository from '../repositories/file.repository';
import usersService from '../services/users.service';
import NotFoundException from '../exceptions/notFound.exception';

class FilesService {
  private filesRepository = filesRepository;
  private usersService = usersService;

  async create(fileData: Partial<File>, userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (user) {
      fileData.createdBy = user;
    }
    return this.filesRepository.create(fileData);
  }

  async sharing(fileId: string, isShared: boolean) {
    const file = await this.filesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException(MSG_EXCEPTION.NOT_FOUND_FILE);
    }
    file.isShared = isShared;
    return this.filesRepository.save(file);
  }

  findOneById(fileId: string) {
    return this.filesRepository.findOne(fileId);
  }

  findAll(userId: string) {
    return this.filesRepository.findByUser(userId);
  }

  async isShared(fileId: string) {
    const file = await this.filesRepository.findOne(fileId);
    if (!file) {
      throw new NotFoundException(MSG_EXCEPTION.NOT_FOUND_FILE);
    }
    return file.isShared;
  }

  incrementView(file: File) {
    file.viewNumber++;
    return this.filesRepository.save(file);
  }
}

export default new FilesService();
