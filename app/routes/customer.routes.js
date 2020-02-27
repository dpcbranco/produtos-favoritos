const router = require('express').Router();
const customerController = require('../controllers/customer.controller');
const customerHandler = require('../services/helpers/customer.handler')


router.get('/customer', customerController.getCustomer)
      .post('/customer/new', customerHandler.emailValidator, customerController.postCustomer)
      .delete('/customer/delete', customerController.deleteCustomer)
      .patch('/customer/update', customerController.patchCustomer);

module.exports = router;