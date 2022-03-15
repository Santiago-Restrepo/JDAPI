// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const assesor = require("../controllers/assesor.controller");
const {Router} = require("express");
const { verifyToken, isAdmin, isEmployee, isBilling } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isAdmin] , assesor.createAssesor)

router.get('/', [verifyToken, isBilling] , assesor.findAssesor)

router.put('/:id', [verifyToken, isAdmin] , assesor.updateAssesor)

router.delete('/:id', [verifyToken, isAdmin] , assesor.deleteAssesor)

router.post('/insertMany', [verifyToken, isAdmin] , assesor.insertManyAssesors)


// export default router;
module.exports = router;