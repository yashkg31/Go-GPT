// import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
// import { configureOpenAI } from "../config/open-ai-config.js";
// import User from "../models/User.js";
// export const generateChatCompletion = async (req, res, next) => {
//     try {
//         const {message} = req.body;
//         const user = await User.findById(res.locals.jwtData.id);
//         if(!user){
//             return res.status(411).json({
//                 message: "User not registered or Token malfunctioned"
//             })
//         }
//         const chats = user.chats.map(( {role, content }) => ({role, content})) as ChatCompletionRequestMessage[];
//         chats.push({content: message, role: "user"});
//         user.chats.push({content: message, role: "user"});
//         const config = configureOpenAI();
//         const openai = new OpenAIApi(config);
//         const chatResponse = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: chats
//         });
//         user.chats.push(chatResponse.data.choices[0].message);
//         await user.save();
//         return res.status(200).json({
//             chats: user.chats
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Something went wrong"
//         })
//     }
// }
import { OpenAIApi } from "openai";
import { configureOpenAI } from "../config/open-ai-config.js";
import User from "../models/User.js";
export const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        console.log("Received message:", message);
        if (!message) {
            return res.status(400).json({
                message: "No message provided"
            });
        }
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(411).json({
                message: "User not registered or Token malfunctioned"
            });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        // console.log("Sending request to OpenAI...");
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-4o-mini",
            messages: chats
        });
        // console.log("Received response from OpenAI:", chatResponse.data);
        const responseMessage = chatResponse.data.choices[0].message;
        if (!responseMessage) {
            return res.status(500).json({
                message: "No response message from OpenAI"
            });
        }
        user.chats.push(responseMessage);
        await user.save();
        return res.status(200).json({
            chats: user.chats
        });
    }
    catch (error) {
        console.error("Error in generateChatCompletion:", error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};
export const sendAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(411).send("User does not exists or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(411).send("Permisions didn't match");
        }
        res.status(200).json({
            message: "OK",
            chats: user.chats
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
export const deleteAllChats = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(411).send("User does not exists or Token malfunctioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(411).send("Permisions didn't match");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        res.status(200).json({
            message: "OK"
        });
    }
    catch (error) {
        console.log(error);
        res.status(411).json({
            message: "ERROR",
            cause: error.message
        });
    }
};
//# sourceMappingURL=chat-controllers.js.map
