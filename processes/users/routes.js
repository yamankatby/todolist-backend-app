const express = require('express');

const controllers = require('./controllers');
const middlewares = require('../../config/middlewares');

const router = express.Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.get('/profile', middlewares.authorization, controllers.profile);

module.exports = router;
