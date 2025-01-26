import request from 'supertest';
import app from '../../index';
import db from '../../database';

describe('Auth routes', () => {
  afterAll(async () => {
    const connection = await db.connect();
    const sql = `DELETE FROM auth;`;
    await connection.query(sql);
    connection.release();
  });

  it('should return token after registering a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com', password: '1234567890' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('token');
  });

  it('should login already registered user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '1234567890' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return an error when trying to login with not existing user credential', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'random@random.com', password: '1234567890' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'User does not exist' });
  });

  it('should return an error when trying to login with invalid user credential', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: '0000000000' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: 'Invalid credentials' });
  });
});
