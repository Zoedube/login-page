import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createConnection({
  host:"sql8.freesqldatabase.com",
  user:"sql8765094",
  password:"ayiMXBKeEY",
  database:"sql8765094"
})