// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const carrier = require("../controllers/carrier.controller");
const {Router} = require("express");

const router = Router();

router.post('/', carrier.createCarrier)

router.get('/', carrier.findCarrier)

router.put('/:id', carrier.updateCarrier)

router.delete('/:id', carrier.deleteCarrier)

router.post('/insertMany', carrier.insertManyCarriers)


// export default router;
module.exports = router;