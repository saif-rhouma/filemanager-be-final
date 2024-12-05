import AppDataSource from '../../database/data-source';
import { User } from '../models/user.model';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }
}

export default new UserRepository();
