import { MSG_EXCEPTION } from '../constants/messages';
import tagsRepository from '../repositories/tag.repository';
import filesService from '../services/files.service';
import NotFoundException from '../exceptions/notFound.exception';
import { Tag } from 'core/models/tag.model';

class TagsService {
  private tagsRepository = tagsRepository;
  private filesService = filesService;

  async create(tagData: Partial<Tag>, fileId: string) {
    const file = await this.filesService.findOneById(fileId);

    if (!file) {
      throw new NotFoundException(MSG_EXCEPTION.NOT_FOUND_FILE);
    }

    let tag = await this.tagsRepository.findByTagText(tagData.text);
    if (!tag) {
      tag = await this.tagsRepository.create(tagData);
    }
    if (tag.files?.length) {
      tag.files.push(file);
    } else {
      tag.files = [file];
    }

    return this.tagsRepository.save(tag);
  }
}

export default new TagsService();
