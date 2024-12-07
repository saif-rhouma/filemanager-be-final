import HTTP_CODE from '../constants/httpCode';
import BaseException from './baseException';

class NotFoundException extends BaseException {
  constructor(message, status = HTTP_CODE.NotFound) {
    super(message, status);
  }
}
export default NotFoundException;
