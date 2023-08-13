const express = require('express');
const router = express.Router();
const CostPaymentController = require('../controller/CostPaymentController');


//GET
router.get('/', CostPaymentController.getAllCostPayments);
router.get('/:id', CostPaymentController.getCostPaymentById);

// //CREATE
router.post('/', CostPaymentController.createCostPayment);

// //DELETE
router.delete('/:id', CostPaymentController.deleteCostPaymentById);


// //UPDATE
router.put('/:id', CostPaymentController.updateCostPaymentById);


module.exports = router;