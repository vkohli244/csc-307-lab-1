// backend.js
import express from "express";
import cors from "cors";
const app = express();
const port = 8000;


app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};



app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUser = (name, job) => {
   return users["users_list"].filter((user)=>{
    const nameMatches = user["name"] === name;
    const jobMatches = user["job"] === job;

    return nameMatches && jobMatches;
  });
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined || job != undefined) {
    let result = findUser(name,job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
const generateId = () => {
  return String(Math.random());
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  
  userToAdd.id = generateId();
  
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});



const deleteUser = (id) => {
  const removedUser = users["users_list"].filter((user) => user.id !== id);
  users["users_list"] = removedUser; 
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id; 
    const userExists = users["users_list"].find((user) => user.id === id); // check if the user exists, so we don't try to delete a user that doesn't exist

  if (userExists) {
    deleteUser(id);
    res.status(204).send(); 
  } else {
    res.status(404).send("User not found.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


