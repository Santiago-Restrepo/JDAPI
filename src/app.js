import express from "express";
import TaskRoutes from "./routes/task.routes"

const app = express();

app.set('port', process.env.PORT || 3000)

app.get('/', (req,res) =>{
    res.json({response: 'Welcome to the world'})
})

app.use('/api/tasks', TaskRoutes)

export default app;