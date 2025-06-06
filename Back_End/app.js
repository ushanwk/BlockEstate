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
import paymentRouter from "./routes/payment.routes.js";
import sponsorshipRoutes from "./routes/sponsorship.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import investorRouter from "./routes/investor.routes.js";


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
app.use('/api/payment/', paymentRouter);
app.use('/api/sponsorship/', sponsorshipRoutes);
app.use('/api/ask-ai/', chatRoutes);
app.use('/api/investor/', investorRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate api');
});

app.listen(PORT, async () => {
   console.log(`BlockEstate listening on port ${PORT}!`);
   await connectToDatabase();
});