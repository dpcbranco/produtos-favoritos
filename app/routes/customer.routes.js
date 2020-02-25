const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const customervalidator = require('../services/helpers/customervalidator.handler')


router.get('/customer', customerController.getCustomer)
      .post('/customer/new', customervalidator.emailValidator, customerController.postCustomer)
      .delete('/customer/delete', customerController.deleteCustomer)
      .patch('/customer/update', customerController.patchCustomer);

module.exports = router;