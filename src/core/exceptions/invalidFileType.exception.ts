import HTTP_CODE from '../constants/httpCode';
import BaseException from './baseException';

class InvalidFileTypeException extends BaseException {
  constructor(message, status = HTTP_CODE.NotAcceptable) {
    super(message, status);
  }
}
export default InvalidFileTypeException;
