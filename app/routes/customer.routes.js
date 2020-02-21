const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const validator = require('../services/helpers/validator.handler')


router.get('/customer', customerController.getCustomer)
      .post('/customer/new', validator.emailValidator, customerController.postCustomer)
      .delete('/customer/delete', customerController.deleteCustomer)
      .patch('/customer/update', customerController.patchCustomer);

module.exports = router;