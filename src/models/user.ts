import User from '../types/user';
import db from '../database';
import CustomError from './error';

class UserModel {
  private validateUserRole(role: string) {
    if (role !== 'admin' && role !== 'user') {
      throw new CustomError(
        400,
        'user role should be either "admin" or "user"',
      );
    }
  }

  private validateUserId(userId?: string) {
    if (!(!isNaN(Number(userId)) && Number.isInteger(Number(userId)))) {
      throw new CustomError(400, 'invalid userId');
    }
  }

  async create(user: User): Promise<User> {
    try {
      this.validateUserRole(user.role);
      const connection = await db.connect();
      const query = `INSERT INTO users (firstName, lastName, email, role) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(query, [
        user.firstName,
        user.lastName,
        user.email,
        user.role,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new Error(
        `Failed to create new user. Error: ${(error as Error).message}`,
      );
    }
  }

  async get(userId: string): Promise<User> {
    try {
      this.validateUserId(userId);
      const connection = await db.connect();
      const query = `SELECT * FROM users WHERE id = $1`;
      const result = await connection.query(query, [userId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new Error(
        `Failed to fetch a user. Error: ${(error as Error).message}`,
      );
    }
  }

  async collection(role?: string): Promise<User[]> {
    try {
      if (role) {
        this.validateUserRole(role);
      }
      let query = `SELECT * FROM users`;
      const bindValues: any[] = [];

      if (role) {
        bindValues.push(role);
        query += ` WHERE role = $1`;
      }

      const connection = await db.connect();
      const result = await connection.query(query, bindValues);
      connection.release();
      return result.rows;
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new Error(
        `Failed to fetch a user. Error: ${(error as Error).message}`,
      );
    }
  }

  async update(user: Partial<User>, userId: string): Promise<Partial<User>> {
    try {
      this.validateUserId(userId);
      if (user.role) {
        this.validateUserRole(user.role);
      }
      if (Object.keys(user).length === 0) {
        return Promise.resolve(user as Partial<User>);
      }

      const connection = await db.connect();
      const query = `UPDATE users SET (firstName, lastName, role) = ($1, $2, $3) WHERE id = $4 RETURNING *`;
      const result = await connection.query(query, [
        user.firstName,
        user.lastName,
        user.role,
        userId,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new Error(
        `Failed to update user. Error: ${(error as Error).message}`,
      );
    }
  }

  async remove(userId: string): Promise<User> {
    try {
      this.validateUserId(userId);
      const connection = await db.connect();
      const query = `DELETE FROM users WHERE id = $1;`;
      const result = await connection.query(query, [userId]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new Error(
        `Failed to fetch a user. Error: ${(error as Error).message}`,
      );
    }
  }
}

export default UserModel;
