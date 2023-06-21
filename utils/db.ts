import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "64.227.134.246",
  user: "dev_easydesk",
  password: "Xfi430%a9",
  database: "dev_easydesk",
  port: 3306,
  maxIdle: 10,
});