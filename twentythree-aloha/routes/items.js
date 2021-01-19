
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getItems);
// router.post('/', itemController.createItem);
//create
router.post('/upload', itemController.uploadItems);
//upadte
router.put('/update/:id', itemController.updateItem);

module.exports = router;