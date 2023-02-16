const sql = require("./db.js");

// constructor
const User = function(user) {
  this.email = user.email
  this.nome = user.nome
  this.password = user.password
  this.type = user.type
};

// Create a User
User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

// Get all Users
User.getAll = (result) => {
  let query = "SELECT * FROM user";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

// Find User by email
User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};


User.updateByIdUser = (id_user, user, result) => {
  sql.query(
    "UPDATE user SET nome = ?, email = ? WHERE id_user = ?",
    [user.nome, user.email, id_user],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id_user: id_user, ...user });
      result(null, { id_user: id_user, ...user });
    }
  );
};

User.updateByIdPassword = (id_user, user, result) => {
  sql.query("UPDATE user SET password = ? WHERE id_user = ?", [user.password, id_user], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id_user: id_user, ...user });
      result(null, { id_user: id_user, ...user });
    }
  );
};



module.exports = User;