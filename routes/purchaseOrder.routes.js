// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const purchaseOrder = require("../controllers/purchaseOrder.controller");
const {Router} = require("express");

const router = Router();

router.post('/', purchaseOrder.createPurchaseOrder)

router.get('/', purchaseOrder.findPurchaseOrder)

router.put('/:id', purchaseOrder.updatePurchaseOrder)

router.delete('/:id', purchaseOrder.deletePurchaseOrder)


// export default router;
module.exports = router;