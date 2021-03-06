const { Run } = require('../models');

const getModel = (model) => {
  const models = {
    run: Run,
  };

  return models[model];
};

const createItem = (model, res, item) => {
  const Model = getModel(model);
  console.log(item);
  return Model.create(item)
  .then((newItem) => {
    if (newItem.dataValues.password) delete newItem.dataValues.password;
    res.status(201)
    .json(newItem);
  })
  .catch(error => {
    const errorMessages = error.errors.map(e => e.message);
    res.status(400)
    .json({ error: errorMessages });
  });
};

const getAllItems = (model, res) => {
  const Model = getModel(model);

  return Model.findAll({ order: [ ['date', 'DESC'] ] })
  .then((items) => {
    items.map(item => {
      if (item.dataValues.password) delete item.dataValues.password;
    });
    res.status(200)
    .json(items);
  });
};

const getLatestItems = (model, res, limit) => {
  const Model = getModel(model);

  return Model.findAll({ order: [ ['date', 'DESC']], limit: limit })
  .then((items) => {
    items.map(item => {
      if (item.dataValues.password) delete item.dataValues.password;
    });
    res.status(200)
    .json(items);
  });
};

const getItemById = (model, res, id) => {
  const Model = getModel(model);
  
  return Model.findByPk(id)
    .then(item => {
      if (!item) {
        res.status(404)
        .json({ error: `The ${model} could not be found.` });
      } else {
        if (item.dataValues.password) delete item.dataValues.password;
        res.status(200)
        .json(item);
      }
    });
};

const updateItem = (model, res, itemUpdate, id) => {
  const Model = getModel(model);

  return Model.update(itemUpdate, { where: { id } })
    .then(updatedRows => {
      if (updatedRows[0] === 0) {
        res.status(404)
        .json({ error: `The ${model} could not be found.` });
      } else {
        res.status(200)
        .json(updatedRows);
      }
    });
};

const deleteItem = (model, res,  id) => {
  const Model = getModel(model);

  return Model.destroy({ where: { id } })
    .then(deletedRows => {
      if (!deletedRows) {
        res.status(404)
        .json({ error: `The ${model} could not be found.` });
      } else {
        res.status(204)
        .json(deletedRows);
      }
    });
}

module.exports = {
  createItem,
  getAllItems,
  getLatestItems,
  getItemById,
  updateItem,
  deleteItem,
};