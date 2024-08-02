import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config();

const app = express();

app.use(cors({
    origin: "https://go-gpt-frontend.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// app.use(morgan("dev")); // Uncomment this for development

app.use("/api/v1", appRouter);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://go-gpt-frontend.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

export default app;
