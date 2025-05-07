const express = require('express');
const router = express.Router();
const { getVehiclesByType } = require('../controllers/vehicleController');

router.get('/', getVehiclesByType);

module.exports = router;
