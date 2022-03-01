import express from "express";
import morgan from "morgan";
import cors from "cors";
import TaskRoutes from "./routes/task.routes";

const app = express();
//configure
app.set("port", process.env.PORT || 3000);

//middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(express.json()); //Usamos esto para que express entienda json
app.use(express.urlencoded({extended: false})); //Usamos esto para que express entienda peticiones de formularios html
app.use(morgan('dev')); //Mostrar las peticiones que van llegando por consola

//routes
app.get("/", (req, res) => {
    res.json({ response: "Welcome to the world" });
});

app.use("/api/tasks", TaskRoutes);

export default app;
