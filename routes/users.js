var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.user_create);
router.post('/login', userController.user_login);

module.exports = router;
