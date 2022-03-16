// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const client = require("../controllers/client.controller");
const {Router} = require("express");
const { verifyToken, isEmployee } = require("../middlewares");

const router = Router();

router.post('/', [verifyToken, isEmployee], client.createClient)

router.get('/', [verifyToken, isEmployee], client.findClient)

router.put('/:id', [verifyToken, isEmployee], client.updateClient)

router.delete('/:id', [verifyToken, isEmployee], client.deleteClient)

router.post('/insertMany', [verifyToken, isEmployee], client.insertManyClients)


// export default router;
module.exports = router;