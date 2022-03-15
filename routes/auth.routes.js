const auth = require("../controllers/auth.controller");
const {Router} = require("express");

const router = Router();

router.post('/signUp', auth.signUp)
router.post('/signIn', auth.signIn)

// export default router;
module.exports = router;