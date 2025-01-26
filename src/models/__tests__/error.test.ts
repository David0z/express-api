import Error from '../../interfaces/errors';
import CustomError from '../error';

describe('Custom Erro model', () => {
  describe('Test custom error model class', () => {
    it('returns a class object with message and status', () => {
      const errorObject: Error = { message: 'Unauthorized', status: 401 };

      const customErrorModel = new CustomError(
        errorObject.status!,
        errorObject.message!,
      );

      expect(customErrorModel).toHaveProperty('message');
      expect(customErrorModel).toHaveProperty('status');
    });
  });
});
