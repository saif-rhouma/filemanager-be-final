import usersRepository from '../repositories/user.repository';

class UsersService {
  private usersRepository = usersRepository;
  create() {
    return this.usersRepository.create({ email: 'test@gmail.com', password: '0000' });
  }
  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }
  findOneById(userId: string) {
    return this.usersRepository.findOne(userId);
  }
}

export default new UsersService();
