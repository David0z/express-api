import Auth from '../types/auth';
import db from '../database';
import CustomError from './error';

class AuthModel {
  async getAuthUser(email: string): Promise<Auth> {
    try {
      const connection = await db.connect();
      const query = `SELECT * FROM auth WHERE email = $1`;
      const result = await connection.query(query, [email]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to fetch user. Error: ${(error as Error).message}`,
      );
    }
  }

  async createAuthUser(newUser: Auth): Promise<Auth> {
    try {
      const connection = await db.connect();
      const query = `INSERT INTO auth (email, password) VALUES ($1, $2) RETURNING *`;
      const result = await connection.query(query, [
        newUser.email,
        newUser.password,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Failed to create new user. Error: ${(error as Error).message}`,
      );
    }
  }
}

export default AuthModel;
