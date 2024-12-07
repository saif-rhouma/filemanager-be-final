import { hashPassword } from '../../helpers/auth.helpers';
import { MSG_EXCEPTION } from '../constants/messages';
import UnauthorizedException from '../exceptions/unauthorizedException';
import usersRepository from '../repositories/user.repository';
import { User } from '../models/user.model';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { instanceToPlain } from 'class-transformer';
import environment from '../../configs/environment';

import jwt from 'jsonwebtoken';

const scrypt = promisify(_scrypt);

class AuthService {
  private usersRepository = usersRepository;

  async signup(userData: User) {
    const users = await this.usersRepository.findByEmail(userData.email);
    if (users.length) {
      throw new UnauthorizedException(MSG_EXCEPTION.OTHER_ALREADY_IN_USE_EMAIL);
    }
    // Hash the users password
    const result = await hashPassword(userData.password);
    userData.password = result;
    // Create a new user and save it
    const user = await usersRepository.create({
      ...userData,
    });
    return user;
  }

  async login(email: string, password: string) {
    const [user] = await usersRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException(MSG_EXCEPTION.NOT_FOUND_USER);
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new UnauthorizedException(MSG_EXCEPTION.OTHER_BAD_PASSWORD);
    }

    //! HERE NEED SERIALIZE THE USER FOR TOKEN ()
    const userPlain = instanceToPlain(user);
    delete userPlain.password;
    //! END SERIALIZE THE USER FOR TOKEN

    const { accessToken, refreshToken } = await this.generateUserTokens(userPlain);
    return { ...user, accessToken, refreshToken };
  }

  async generateUserTokens(user) {
    delete user.password;
    const accessToken = jwt.sign({ user }, environment.ACCESS_TOKEN_SECRET, {
      expiresIn: '1m',
    });
    const refreshToken = jwt.sign({ user }, environment.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const user = await jwt.verify(refreshToken, environment.REFRESH_TOKEN_SECRET);
    const { accessToken } = await this.generateUserTokens(user);
    return { accessToken };
  }
}

export default new AuthService();
