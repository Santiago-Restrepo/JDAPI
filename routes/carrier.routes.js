// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const carrier = require("../controllers/carrier.controller");
const {Router} = require("express");
const { verifyToken, isAdmin } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isAdmin], carrier.createCarrier)

router.get('/', carrier.findCarrier)

router.put('/:id', [verifyToken, isAdmin], carrier.updateCarrier)

router.delete('/:id', [verifyToken, isAdmin], carrier.deleteCarrier)

router.post('/insertMany', [verifyToken, isAdmin], carrier.insertManyCarriers)


// export default router;
module.exports = router;