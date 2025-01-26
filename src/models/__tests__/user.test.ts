import User from '../../types/user';
import UserModel from '../user';
import db from '../../database';

const userModel = new UserModel();

describe('User model', () => {
  describe('Test user model methods', () => {
    const user: User = {
      email: 'testuser@test.com',
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      role: 'user',
    };

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = `DELETE FROM users;`;
      await connection.query(sql);
      connection.release();
    });

    it('creates new user', async () => {
      const userToCreate = {
        email: 'testuser2@test.com',
        firstName: 'TestFirstName2',
        lastName: 'TestLastName2',
        role: 'user',
      };
      const createdUser = await userModel.create(userToCreate);

      expect(createdUser).toEqual({ id: createdUser.id, ...userToCreate });
    });
  });
});
