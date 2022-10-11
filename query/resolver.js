import { Op } from 'sequelize';

/**
 * Resolves a query string to a Sequelize DB query options object.
 *
 * @param {*} query The Express request query object
 *
 * @author C. Mayer (meggsimum)
 */
const getSequelizeOpts = (query) => {
  let order = null;
  let where = null;
  let limit = null;

  // ORDER BY
  const orderByColumn = query.order_by;
  if (orderByColumn && orderByColumn !== '') {
    const orderByDir = query.order_dir || 'ASC';
    order = [
      [orderByColumn, orderByDir]
    ];
  }

  // LIMIT
  limit = query.limit ? Number(query.limit) : null;

  // FILTER (equals)
  const filterParts = query.filter ? query.filter.split('=') : null;
  if (filterParts && filterParts.length === 2) {
    const whereProp = filterParts[0];
    const whereVal = filterParts[1];
    where = {};

    where[whereProp] = {
      [Op.eq]: whereVal
    };
  }

  return {
    where: where,
    limit: limit,
    order: order
  }
};

export default {
  getSequelizeOpts
};
