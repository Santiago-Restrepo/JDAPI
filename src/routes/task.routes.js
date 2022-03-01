// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const taskController = require("../controllers/task.controller");
const {Router} = require("express");

const router = Router();

router.get('/', taskController.findAllTasks)

router.post('/', taskController.createTask)

router.get('/:id', taskController.findOneTask)

router.delete('/:id', taskController.deleteTask)

router.put('/:id', taskController.updateTask)

// export default router;
module.exports = router;