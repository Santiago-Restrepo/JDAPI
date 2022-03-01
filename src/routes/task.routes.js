import {Router} from "express";

const router = Router();

router.get('/', (req,res) =>{
    res.send('tasks')
})

router.post('/', (req, res) => {
    res.json('saving a new task')
})

export default router;