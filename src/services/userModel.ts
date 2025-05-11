import pool from "../config/db";
import { iCreateUserDTO, iUpdateUserDTO } from "./userDTO";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
export const getUserByIdService = async (id: string) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
export const createUserService = async (user: iCreateUserDTO) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [user.name, user.email],
  );
  return result.rows[0];
};
export const updateUserService = async (id: string, user: iUpdateUserDTO) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [user.name, user.email, id],
  );
  return result.rows[0];
};
export const deleteUserService = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
