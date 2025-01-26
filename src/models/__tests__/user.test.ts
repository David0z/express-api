import User from '../../types/user';
import UserModel from '../user';
import db from '../../database';

const userModel = new UserModel();

describe('User model', () => {
  describe('Test user model methods', () => {
    let user: User = {
      email: 'testuser@test.com',
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      role: 'admin',
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

    it('fetches all users', async () => {
      const users = await userModel.collection();
      expect(users).toHaveLength(2);
    });

    it('fetches all users with query', async () => {
      const users = await userModel.collection('admin');
      expect(users).toHaveLength(1);
    });

    it('fetches one user by id', async () => {
      const id = user.id as string;
      const fetchedUser = await userModel.get(id);
      expect(fetchedUser).toEqual(user);
    });

    it('updates the user', async () => {
      const id = user.id as string;
      const userObject = {
        firstName: 'New Name',
        lastName: 'New Last Name',
      };
      const fetchedUser = await userModel.update(userObject, id);
      user = { ...user, ...userObject };
      expect(fetchedUser).toEqual(user);
    });

    it('deletes the user', async () => {
      const id = user.id as string;
      const deletedUser = await userModel.remove(id);
      expect(deletedUser).toEqual(user);
    });
  });
});
