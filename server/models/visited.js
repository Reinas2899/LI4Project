const sql = require("./db.js");

// constructor
const Visited = function(visited) {
  this.id_user = visited.id_user;
  this.id_restaurant = visited.id_restaurant;
  this.date = visited.date;
};

Visited.create = (newVisited, result) => {
  sql.query("INSERT INTO user_visited_restaurant SET ?", newVisited, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created visited: ", { id_user: res.id_user, ...newVisited });
    result(null, { id_user: res.id_user, ...newVisited });
  });
};

Visited.getByID = (id_user, result) => {
  let query = "SELECT restaurant.* FROM restaurant JOIN user_visited_restaurant ON restaurant.id_restaurant = user_visited_restaurant.id_restaurant WHERE user_visited_restaurant.id_user = ?"
  console.log(query)

  sql.query(query, [id_user], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

module.exports = Visited;