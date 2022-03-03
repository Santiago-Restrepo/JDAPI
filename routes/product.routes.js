// import {Router} from "express";
// import * as taskController from "../controllers/task.controller";
const product = require("../controllers/product.controller");
const {Router} = require("express");

const router = Router();

router.post('/', product.createProduct)

router.get('/', product.findProduct)

router.put('/:id', product.updateProduct)

router.delete('/:id', product.deleteProduct)

router.post('/insertMany', product.insertManyProducts)


// export default router;
module.exports = router;