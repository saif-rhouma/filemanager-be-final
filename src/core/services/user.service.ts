import userRepository from '../repositories/user.repository';

export class UsersService {
  private static userRepository = userRepository;
  static create() {
    return this.userRepository.create({ email: 'test@gmail.com', password: '0000' });
  }
}
