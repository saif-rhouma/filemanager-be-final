import HTTP_CODE from '../constants/httpCode';
import BaseException from './baseException';

class UnauthorizedException extends BaseException {
  constructor(message, status = HTTP_CODE.Unauthorized) {
    super(message, status);
  }
}
export default UnauthorizedException;
