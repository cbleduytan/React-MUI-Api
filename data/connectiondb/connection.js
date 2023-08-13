const mysql2 = require("mysql2");
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "userDB",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to mySQL:", error);
  } else {
    console.log("Connected to mySQL database");
  }
});

module.exports = connection;
