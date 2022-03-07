// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const client = require("../controllers/client.controller");
const {Router} = require("express");

const router = Router();

router.post('/', client.createClient)

router.get('/', client.findClient)

router.put('/:id', client.updateClient)

router.delete('/:id', client.deleteClient)

router.post('/insertMany', client.insertManyClients)


// export default router;
module.exports = router;