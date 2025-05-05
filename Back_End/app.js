import express from 'express';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT } from './config/env.config.js';
import authRouter from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRouter from "./routes/admin.routes.js";
import userRouter from "./routes/user.routes.js";
import propertyRouter from "./routes/property.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/api/auth/', authRouter);
app.use('/api/admin/', adminRouter);
app.use('/api/user/', userRouter);
app.use('/api/property/', propertyRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate api');
});

app.listen(PORT, async () => {
   console.log(`BlockEstate listening on port ${PORT}!`);
   await connectToDatabase();
});