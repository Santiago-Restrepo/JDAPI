// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const country = require("../controllers/country.controller");
const {Router} = require("express");
const { verifyToken, isEmployee } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isEmployee], country.createCountry)

router.get('/', country.findCountry)

router.put('/:id', [verifyToken, isEmployee], country.updateCountry)

router.delete('/:id', [verifyToken, isEmployee], country.deleteCountry)

router.post('/insertMany', [verifyToken, isEmployee], country.insertManyCountries)


// export default router;
module.exports = router;