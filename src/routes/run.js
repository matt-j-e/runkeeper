const express = require('express');
const cors = require('cors');
const router = express.Router();
const runControllers = require('../controllers/run.js');

router.all('*', cors());

router
  .route('/')
  .get(runControllers.getAll)
  .post(runControllers.create);

router
  .route('/latest')
  .get(runControllers.getLatest)

router
  .route('/:runId')
  .get(runControllers.getById)
  .patch(runControllers.updateById)
  .delete(runControllers.deleteById)

module.exports = router;