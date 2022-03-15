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

router.post('/', [verifyToken, isAdmin, isEmployee] ,invoice.createInvoice)

router.get('/', [verifyToken, isAdmin, isEmployee] ,invoice.findInvoice)

router.put('/updateMany', [verifyToken, isAdmin], invoice.updateManyInvoices)

router.put('/:id', [verifyToken, isAdmin], invoice.updateInvoice)

router.delete('/:id', [verifyToken, isAdmin], invoice.deleteInvoice)


// export default router;
module.exports = router;