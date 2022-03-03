// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const paymentMethod = require("../controllers/paymentMethod.controller");
const {Router} = require("express");

const router = Router();

router.post('/', paymentMethod.createPaymentMethod)

router.get('/', paymentMethod.findPaymentMethod)

router.put('/:id', paymentMethod.updatePaymentMethod)

router.delete('/:id', paymentMethod.deletePaymentMethod)

router.post('/insertMany', paymentMethod.insertManyPaymentMethods)


// export default router;
module.exports = router;