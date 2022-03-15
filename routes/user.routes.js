// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const user = require("../controllers/user.controller");
const {Router} = require("express");
const { verifyToken } = require("../middlewares");

const router = Router();

router.get('/', verifyToken ,user.findUser)

// export default router;
module.exports = router;