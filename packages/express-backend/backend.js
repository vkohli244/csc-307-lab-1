// backend.js
import express from "express";
import cors from "cors";
import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService
    .getUsers(name, job)
    .then((users) => {
      res.send({ users_list: users });
    })
    .catch((error) => {
      res.status(500).send("Error fetching users");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send("Error fetching user");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService
    .addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      res.status(500).send("Error creating user");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userService
    .removeUser(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send("Error deleting user");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


