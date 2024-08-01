import {Router} from 'express'
import userRouter from './userRoutes.js';
import chatRouter from './chatRoutes.js';
import { validate } from '../utils/validators.js';

const appRouter = Router();

appRouter.use("/user", userRouter)
appRouter.use("/chat", chatRouter)

export default appRouter;