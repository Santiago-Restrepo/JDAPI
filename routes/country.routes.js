// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const country = require("../controllers/country.controller");
const {Router} = require("express");

const router = Router();

router.post('/', country.createCountry)

router.get('/', country.findCountry)

router.put('/:id', country.updateCountry)

router.delete('/:id', country.deleteCountry)

router.post('/insertMany', country.insertManyCountries)


// export default router;
module.exports = router;