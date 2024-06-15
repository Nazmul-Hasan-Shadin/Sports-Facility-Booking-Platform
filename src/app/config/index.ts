import dotenv from "dotenv";

dotenv.config();

export default {
  db_uri: process.env.DB_URI,
  db_name: process.env.DB_NAME,
  port:process.env.PORT
};
