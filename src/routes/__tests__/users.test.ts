import request from 'supertest';
import app from '../../index';
import db from '../../database';
import User from '../../types/user';
import UserModel from '../../models/user';

describe('Users routes', () => {
  let authData = {
    user: { email: 'test10@test.com', password: '1234567890' },
    token: '',
  };

  const userData: User = {
    email: 'testuser3@test.com',
    firstName: 'TestFirstName3',
    lastName: 'TestLastName3',
    role: 'user',
  };

  beforeAll(async () => {
    const userModel = new UserModel();
    const createdUser = await userModel.create(userData);
    userData.id = createdUser.id;

    const res = await request(app)
      .post('/api/auth/register')
      .send(authData.user);

    authData.token = res.body.token;
  });

  afterAll(async () => {
    const connection = await db.connect();
    const sql = `
      DELETE FROM auth;
      DELETE FROM users;
    `;
    await connection.query(sql);
    connection.release();
  });

  it('should retrieve a list of users', async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', `Bearer ${authData.token}`)
      .send(userData);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('should fail when unauthenticated', async () => {
    const res = await request(app).get(`/api/users`).send();

    expect(res.status).toBe(401);
  });

  it('should fail when invalid token', async () => {
    const res = await request(app)
      .get(`/api/users`)
      .set('Authorization', `Bearer ${authData.token + '123'}`)
      .send();

    expect(res.status).toBe(401);
  });
});
