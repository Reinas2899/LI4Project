const Restaurante = require("../models/restaurante.js");

exports.create = (req, res) => {
  // Validate request
  console.log(req.body)
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Restaurante
  const restaurante = new Restaurante({
    name: req.body.name,
    mobile: req.body.mobile,
    address: req.body.address,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description,
    price_level: req.body.price_level,
    takeaway: req.body.takeaway,
    delivery: req.body.delivery,
    dine_in: req.body.dine_in
  });

  // Save Restaurante in the database
  Restaurante.create(restaurante, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurante."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  
    Restaurante.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restaurantes."
        });
      else res.send(data);
    });
};