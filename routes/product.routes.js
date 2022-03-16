// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const product = require("../controllers/product.controller");
const {Router} = require("express");
const { isAdmin, isEmployee, verifyToken } = require("../middlewares");

const router = Router();

router.post('/',[verifyToken ,isAdmin], product.createProduct)

router.get('/',[verifyToken ,isEmployee] ,product.findProduct)

router.put('/:id',[verifyToken ,isAdmin], product.updateProduct)

router.delete('/:id',[verifyToken ,isAdmin], product.deleteProduct)

router.post('/insertMany',[verifyToken ,isAdmin], product.insertManyProducts)


// export default router;
module.exports = router;