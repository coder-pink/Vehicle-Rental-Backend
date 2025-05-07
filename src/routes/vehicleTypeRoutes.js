const express = require('express');
const router = express.Router();
const { getVehicleTypes } = require('../controllers/vehicleTypeController');

router.get('/', getVehicleTypes);

module.exports = router;
