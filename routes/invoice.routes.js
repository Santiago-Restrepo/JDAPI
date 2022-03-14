// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const invoice = require("../controllers/invoice.controller");
const {Router} = require("express");

const router = Router();

router.post('/', invoice.createInvoice)

router.get('/', invoice.findInvoice)

router.put('/updateMany', invoice.updateManyInvoices)

router.put('/:id', invoice.updateInvoice)


router.delete('/:id', invoice.deleteInvoice)


// export default router;
module.exports = router;