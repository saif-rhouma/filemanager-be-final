import usersRepository from '../repositories/user.repository';

class UsersService {
  private usersRepository = usersRepository;
  create() {
    return this.usersRepository.create({ email: 'test@gmail.com', password: '0000' });
  }
}

export default new UsersService();
