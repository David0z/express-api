import request from 'supertest';
import app from '../../index';
import db from '../../database';
import User from '../../types/user';
import UserModel from '../../models/user';

describe('User routes', () => {
  let authData = {
    user: { email: 'test9@test.com', password: '1234567890' },
    token: '',
  };

  const userData: User = {
    email: 'testuser2@test.com',
    firstName: 'TestFirstName2',
    lastName: 'TestLastName2',
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

  it('should return 201 status after creating a user', async () => {
    const res = await request(app)
      .post('/api/user')
      .set('Authorization', `Bearer ${authData.token}`)
      .send({ ...userData, email: 'randomTest@test.com' });
    expect(res.status).toBe(201);
  });

  it('should retrieve a user by id', async () => {
    const res = await request(app)
      .get(`/api/user/${userData.id}`)
      .set('Authorization', `Bearer ${authData.token}`)
      .send(userData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(userData);
  });

  it('should return 200 status after updating a user', async () => {
    const res = await request(app)
      .patch(`/api/user/${userData.id}`)
      .set('Authorization', `Bearer ${authData.token}`)
      .send({ role: 'admin' });

    expect(res.status).toBe(200);
  });

  it('should return 200 status after deleting a user', async () => {
    const res = await request(app)
      .delete(`/api/user/${userData.id}`)
      .set('Authorization', `Bearer ${authData.token}`)
      .send();

    expect(res.status).toBe(200);
  });

  it('should fail when unauthenticated', async () => {
    const res = await request(app).get(`/api/user/1`).send();

    expect(res.status).toBe(401);
  });

  it('should fail when invalid token', async () => {
    const res = await request(app)
      .get(`/api/user/1`)
      .set('Authorization', `Bearer ${authData.token + '123'}`)
      .send();

    expect(res.status).toBe(401);
  });
});
