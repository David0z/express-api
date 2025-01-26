import Auth from '../../types/auth';
import AuthModel from '../auth';
import db from '../../database';

const authModel = new AuthModel();

describe('Auth model', () => {
  describe('Test user model methods', () => {
    let user: Auth = {
      email: 'testuser@test.com',
      password: '123456789',
    };

    beforeAll(async () => {
      const createdUser = await authModel.createAuthUser(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM auth;`;
      await connection.query(sql);
      connection.release();
    });

    it('creates new auth user', async () => {
      const userToCreate: Auth = {
        email: 'testuser2@test.com',
        password: '0987654321',
      };
      const createdUser = await authModel.createAuthUser(userToCreate);

      expect(createdUser).toEqual({ id: createdUser.id, ...userToCreate });
    });

    it('fetches user', async () => {
      const fetchedUser = await authModel.getAuthUser(user.email);
      expect(fetchedUser).toEqual(user);
    });
  });
});
