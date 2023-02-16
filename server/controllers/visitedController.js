const Visited = require("../models/visited.js");
const User = require("../models/user.js")

exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User


  // Save User in the database
  Visited.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  console.log(req.headers)
  let id_user = parseInt(req.headers.id_user)
  console.log(id_user)
  Visited.getByID(id_user,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};