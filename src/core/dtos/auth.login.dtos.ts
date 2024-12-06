import { Expose } from 'class-transformer';

export class AuthLoginDTO {
  @Expose() id: string;
  @Expose() email: string;
  @Expose() accessToken: string;
  @Expose() refreshToken: string;
}
