const sql = require("./db.js")

// constructor
const Restaurante = function(rest) {
  this.name = rest.name
  this.mobile = rest.mobile
  this.address = rest.address
  this.latitude = rest.latitude
  this.longitude = rest.longitude
  this.description = rest.description
  this.price_level = rest.price_level
  this.takeaway = rest.takeaway
  this.delivery = rest.delivery
  this.dine_in = rest.dine_in
};

Restaurante.create = (newRestaurante, result) => {
    sql.query("INSERT INTO restaurant SET ?", newRestaurante, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created restaurante: ", { id: res.insertId, ...newRestaurante });
      result(null, { id: res.insertId, ...newRestaurante });
    });
  };

Restaurante.getAll = (result) => {
  let query = "SELECT * FROM restaurant";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    console.log("Restaurants: ", res)
    result(null, res)
  })
}

module.exports = Restaurante