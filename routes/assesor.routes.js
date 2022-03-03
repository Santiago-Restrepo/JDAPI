// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const assesor = require("../controllers/assesor.controller");
const {Router} = require("express");

const router = Router();

router.post('/', assesor.createAssesor)

router.get('/', assesor.findAssesor)

router.put('/:id', assesor.updateAssesor)

router.delete('/:id', assesor.deleteAssesor)

router.post('/insertMany', assesor.insertManyAssesors)


// export default router;
module.exports = router;