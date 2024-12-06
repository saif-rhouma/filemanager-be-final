import { Expose } from 'class-transformer';

export class AuthSignUpDTO {
  @Expose() id: string;
  @Expose() email: string;
}
