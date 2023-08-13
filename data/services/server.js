const express = require("express");
const connection = require("../connectiondb/connection");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/service/api/create", (req, res) => {
  console.log("req.body", req.body);
  const name = req.body.userName;
  const age = req.body.age;
  const email = req.body.email;
  const mobile = req.body.phoneNumber;
  const userQuery = `INSERT INTO Registration(userName, age, email, phoneNumber) VALUES (?, ?, ?, ?)`;

  const userValues = [name, age, email, mobile];

  connection.query(userQuery, userValues, (error, result) => {
    if (error) {
      console.error("Error saving Registration form ", error);
      res
        .status(500)
        .json({ error: "Error saving Registration form", details: error });
    } else {
      res.status(200).json({
        status: "ok",
        type: "create",
        message: "Welcome my Registration form",
      });
    }
  });
});

app.get("/service/api/users", (req, res) => {
  const teamQuery = `SELECT * FROM Registration`;
  connection.query(teamQuery, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Error fetching users", details: error });
    } else {
      res.status(200).json(results);
    }
  });
});
// get ID by user
app.get("/service/api/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log("id:", userId);

  const userQueryId = `SELECT * FROM Registration WHERE userId = ?`;
  const userValues = [userId];

  connection.query(userQueryId, userValues, (error, results) => {
    if (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user", details: error });
    } else {
      res.status(200).json(results);
    }
  });
});

app.put("/service/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { userName, age, email, phoneNumber } = req.body;

  const userValues = [userName, age, email, phoneNumber, userId]; // Định nghĩa userValues trước khi sử dụng
  console.log("userId", userId);
  const userQuery = `UPDATE Registration 
    SET userName=?, age=?, email=?, phoneNumber=? 
    WHERE userId=?`;

  connection.query(userQuery, userValues, (error, results) => {
    if (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Error updating user", details: error });
    } else {
      res.status(200).json(results);
    }
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
