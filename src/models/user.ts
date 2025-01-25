import User from '../types/user';
import db from '../database';

class UserModel {
  async create(user: User): Promise<User> {
    try {
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
      throw new Error(
        `Failed to create new user. Error: ${(error as Error).message}`,
      );
    }
  }
}

export default UserModel;
