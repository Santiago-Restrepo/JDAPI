// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const userPermission = require("../controllers/userPermission.controller");
const {Router} = require("express");

const router = Router();

router.post('/', userPermission.createUserPermission)

router.get('/', userPermission.findUserPermission)

router.put('/:id', userPermission.updateUserPermission)

router.delete('/:id', userPermission.deleteUserPermission)

router.post('/insertMany', userPermission.insertManyUserPermissions)


// export default router;
module.exports = router;