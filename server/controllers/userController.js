const User = require("../models/user.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.create = (req, res) => {
  // Validate request

  req.body.password = bcrypt.hashSync(req.body.password, 10)

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save User in the database
  User.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.status(201).send(data);
  });
};


// GET em Utilizador
exports.findOne = (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, 'secretkey', (error, decoded) =>{
    console.log(decoded)
    if (error) return res.status(401).json({
      title: 'Unauthorized'
    })
    User.findByEmail(decoded.userEmail, (error, user) => {
      if (error) return console.log(error)
      res.send(user)
    })
  })
};

exports.findLogin = (req, res) => {
  User.findByEmail(req.body.email, (err, user) => {
    if(err) return res.status(500).json({
      title: 'Server error',
      error: err
    })
    if(!user) {
      return res.status(401).json({
        title: 'User not found',
        error: 'Invalid Credentials'
      })
    }
    if(!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'Login failed',
        error: 'Invalid Credentials'
      })
    }
    let token = jwt.sign({userEmail: user.email}, 'secretkey');
    return res.status(201).json({
      title: 'Login successful',
      token: token
    })
  });
};


exports.updateUser = (req, res) => {
  console.log(req.body)
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateByIdUser(req.body.id_user, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.body.id_user}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.body.id_user
        });
      }
    } else res.send(data);
  });
  
};

// Update an User identified by the id in the request
exports.updatePassword = (req, res) => {
  console.log(req.body)
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateByIdPassword(req.body.id_user, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.body.id_user}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.body.id_user
        });
      }
    } else res.send(data);
  });
  
};




