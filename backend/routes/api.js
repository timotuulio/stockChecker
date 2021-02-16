const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const bodyParser = require('body-parser');

//router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.urlencoded({
    extended: true
}));

router.use(bodyParser.json());

router.get('/upTrend:start:end', stockController.longestUpTrend);
router.get('/highestChange', stockController.highestChange);

module.exports = router;
