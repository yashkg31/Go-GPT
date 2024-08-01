import {Router} from 'express'
import { verifyToken } from '../utils/token-manager.js';
import { chatCompletionValidator } from '../utils/validators.js';
import { deleteAllChats, generateChatCompletion, sendAllChats } from '../controllers/chat-controllers.js';

const chatRouter = Router();
chatRouter.post("/new", chatCompletionValidator, verifyToken, generateChatCompletion)
chatRouter.get("/all-chats", verifyToken, sendAllChats)
chatRouter.delete("/delete", verifyToken, deleteAllChats)

export default chatRouter;