// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const invoice = require("../controllers/invoice.controller");
const {Router} = require("express");
const {
    verifyToken,
    isAdmin,
    isEmployee
} = require('../middlewares')

const router = Router();

router.post('/', [verifyToken, isEmployee] ,invoice.createInvoice)

router.get('/', [verifyToken, isEmployee] ,invoice.findInvoice)

router.get('/count', [verifyToken, isEmployee] ,invoice.countInvoices)

router.put('/updateMany', [verifyToken, isEmployee], invoice.updateManyInvoices)

router.put('/:id', [verifyToken, isEmployee], invoice.updateInvoice)

router.delete('/:id', [verifyToken, isEmployee], invoice.deleteInvoice)


// export default router;
module.exports = router;