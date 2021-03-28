const { Run } = require('../models');
const helpers = require('./helpers');

exports.create = (req, res) => helpers.createItem('run', res, req.body);

exports.getAll = (req, res) => helpers.getAllItems('run', res);
exports.getLatest = (req, res) => helpers.getLatestItems('run', res, 10);

exports.getById = (req, res) => helpers.getItemById('run', res, req.params.runId);

exports.updateById = (req, res) => helpers.updateItem('run', res, req.body, req.params.runId);

exports.deleteById = (req, res) => helpers.deleteItem('run', res, req.params.runId);