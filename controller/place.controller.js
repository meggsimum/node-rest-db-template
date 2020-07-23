/**
 * Controller logic for REST routes for places
 *
 * @author C. Mayer (meggsimum)
 */
const db = require('../config/db.config.js');
const Places = db.places;

// fetch all places
exports.findAll = (req, res) => {
  Places.findAll().then(places => {
    // send all Customers to Client
    res.json(places);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// find a place by ID
exports.findByPk = (req, res) => {
  console.log(req.params.id);
  Places.findByPk(req.params.id).then(place => {
    // console.log(place);
    res.json(place);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Add a place
exports.create = (req, res) => {
  // save to PostgreSQL database
  Places.create(req.body).then(place => {
    // send created place to client
    res.status(201).json(place);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// update a place
exports.update = (req, res) => {
  // check for integer ID larger than 0
  const id = req.body.id;
  if (!id || typeof id !== 'number' || id < 1) {
    res.status(400).json({
      msg: 'Invalid ID',
      details: 'Missing or invalid ID in request body'
    });
    return;
  }

  Places.update(req.body,
    { where: { id: id } }).then(() => {
    res.status(200).json({ mgs: 'Updated Successfully -> Place ID = ' + id });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a place by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Places.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json({ msg: 'Deleted Successfully -> Place ID = ' + id });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};
