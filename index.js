const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 4000;

const { users } = require("./state");
const req = require("express/lib/request");

/* BEGIN - create routes here */
app.get("/", (req, res) => {
  res.send("Welcome to my first Express server!");
});

// app.get("/users", (req, res) => {
//   res.send(users);
// });

app.get("/users/1", (req, res) => {
  res.json(users[0]);
});

// app.post("/users", (req, res) => {
//   const newUser = {
//     _id: 7,
//     name: "John Doe",
//     occupation: "Teacher",
//     avatar: "none",
//   };

//   users.push(newUser);
//   res.send(users);
// });

app.put("/users/1", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("No name provided");
  }

  users[0].name = name;
  res.send(users[0]);
});

app.delete("/users/1", (req, res) => {
  users.shift();

  res.send("deleted");
});

//----------------------------------------

app.post("/users", (req, res) => {
  users.push({
    _id: users.length + 1,
    ...req.body,
  });

  res.json({
    _id: users.length + 1,
    ...req.body,
  });
});

//----------------------------------------

app.get("/users/:userId", (req, res) => {
  req.params.userId;

  res.send(users.find((user) => user._id == req.params.userId));
});

/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
