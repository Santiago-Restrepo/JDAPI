// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const paymentMethod = require("../controllers/paymentMethod.controller");
const {Router} = require("express");
const { verifyToken, isAdmin } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isAdmin],  paymentMethod.createPaymentMethod)

router.get('/', paymentMethod.findPaymentMethod)

router.put('/:id', [verifyToken, isAdmin],  paymentMethod.updatePaymentMethod)

router.delete('/:id', [verifyToken, isAdmin],  paymentMethod.deletePaymentMethod)

router.post('/insertMany', [verifyToken, isAdmin],  paymentMethod.insertManyPaymentMethods)


// export default router;
module.exports = router;