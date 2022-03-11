const city = require("../controllers/city.controller");
const {Router} = require("express");

const router = Router();

router.post('/', city.createCity)

router.get('/', city.findCity)

router.put('/:id', city.updateCity)

router.delete('/:id', city.deleteCity)

router.post('/insertMany', city.insertManyCities)


// export default router;
module.exports = router;