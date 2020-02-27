const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authHandler = require('../services/helpers/auth.handler');

router.post('/auth', authHandler.validateLogon, authController.userLogon)
      .delete('/auth', authHandler.logonRequired, authController.userLogout)
      .post('/register', authHandler.validateRegister, authController.userRegister)

module.exports = router;