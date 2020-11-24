const fs = require("fs");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = 3009;

const db = require("./leaveDB");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/leaveusers", db.getUsers);

app.get("/leaveusers/:id", db.getUsersById);

app.post('/leaveusers', db.createUser);

app.patch('/leaveusers/:id', db.updateUser);

app.delete('/leaveusers/:id', db.deleteUser)

app.get("/leaverequests", db.getRequests);

app.get("/leaverequests/:id", db.getRequestsById);

app.post('/leaverequests', db.createRequest);

app.delete('/leaverequests/:id', db.deleteRequest)


app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);