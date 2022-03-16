// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const city = require("../controllers/city.controller");
const {Router} = require("express");
const { verifyToken, isAdmin } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isAdmin], city.createCity)

router.get('/', city.findCity)

router.put('/:id', [verifyToken, isAdmin], city.updateCity)

router.delete('/:id', [verifyToken, isAdmin], city.deleteCity)

router.post('/insertMany', [verifyToken, isAdmin], city.insertManyCities)


// export default router;
module.exports = router;