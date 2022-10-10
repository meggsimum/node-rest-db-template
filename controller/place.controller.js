/**
 * Controller logic for REST routes for places
 *
 * @author C. Mayer (meggsimum)
 */
import db from '../config/db.config.js';
import queryResolver from '../query/resolver.js';
import logger from '../util/logger.js';

const Places = db.places;

// fetch all places
const findAll = (req, res) => {
  // resolve query params (filter, limit, ...) as Sequelize opts
  const seqOpts = queryResolver.getSequelizeOpts(req.query);
  Places.findAll(seqOpts).then(places => {
    // send all Customers to Client
    res.json(places);
  }).catch(err => {
    logger.error(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// find a place by ID
const findByPk = (req, res) => {
  Places.findByPk(req.params.id).then(place => {
    res.json(place);
  }).catch(err => {
    logger.error(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Add a place
const create = (req, res) => {
  // save to PostgreSQL database
  Places.create(req.body).then(place => {
    // send created place to client
    res.status(201).json(place);
  }).catch(err => {
    logger.error(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// update a place
const update = (req, res) => {
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
    logger.error(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

// Delete a place by ID
const _delete = (req, res) => {
  const id = req.params.id;
  Places.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json({ msg: 'Deleted Successfully -> Place ID = ' + id });
  }).catch(err => {
    logger.error(err);
    res.status(500).json({ msg: 'error', details: err });
  });
};

export default {
  findAll,
  findByPk,
  create,
  update,
  delete: _delete
};
