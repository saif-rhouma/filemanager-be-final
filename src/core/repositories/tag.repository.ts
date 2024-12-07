import AppDataSource from '../../database/data-source';
import { Tag } from '../models/tag.model';
import BaseRepository from './baseRepository';

class TagRepository extends BaseRepository<Tag> {
  constructor() {
    super(AppDataSource.getRepository(Tag));
  }

  findByTagText(tagText: string) {
    return this.repo.findOneBy({ text: tagText });
  }
}

export default new TagRepository();
