// import User from "../models/User.js";
// import { compare, hash } from "bcrypt";
// import { createToken } from "../utils/token-manager.js";
// import { COOKIE_NAME } from "../utils/constants.js";
// export const getAllUsers = async (req, res, next) => {
//     try {
//         const users = await User.find();
//         res.status(200).json({
//             message: "OK", users
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(411).json({
//             message: "ERROR",
//             cause: error.message
//         });
//     }
// };
// export const userSignUp = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;
//         const existingUser = await User.findOne({ email });
//         if (existingUser)
//             return res.status(401).send("User already exists");
//         const hashedPassword = await hash(password, 10);
//         const user = await User.create({
//             name: name,
//             email: email,
//             password: hashedPassword
//         });
//         res.clearCookie(COOKIE_NAME, {
//             path: "/",
//             domain: "localhost",
//             httpOnly: true,
//             signed: true
//         });
//         const token = createToken(user._id.toString(), user.email, "30d");
//         const expires = new Date();
//         expires.setDate(expires.getDate() + 30);
//         res.cookie(COOKIE_NAME, token, {
//             path: "/",
//             domain: "localhost",
//             expires,
//             httpOnly: true,
//             signed: true
//         });
//         res.status(200).json({
//             message: "OK",
//             name: user.name,
//             email: user.email
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(411).json({
//             message: "ERROR",
//             cause: error.message
//         });
//     }
// };
// export const userLogin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({
//             email
//         });
//         if (!user) {
//             return res.status(401).send("User does not exists");
//         }
//         const isPasswordCorrect = await compare(password, user.password);
//         if (!isPasswordCorrect) {
//             return res.status(403).send("Incorrect Password");
//         }
//         res.clearCookie(COOKIE_NAME, {
//             path: "/",
//             domain: "localhost",
//             httpOnly: true,
//             signed: true
//         });
//         const token = createToken(user._id.toString(), user.email, "30d");
//         const expires = new Date();
//         expires.setDate(expires.getDate() + 30);
//         res.cookie(COOKIE_NAME, token, {
//             path: "/",
//             domain: "localhost",
//             expires,
//             httpOnly: true,
//             signed: true
//         });
//         res.status(200).json({
//             message: "OK",
//             name: user.name,
//             email: user.email
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(411).json({
//             message: "ERROR",
//             cause: error.message
//         });
//     }
// };
// export const verifyUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             return res.status(411).send("User does not exists or Token malfunctioned");
//         }
//         if (user._id.toString() !== res.locals.jwtData.id) {
//             return res.status(411).send("Permisions didn't match");
//         }
//         res.status(200).json({
//             message: "OK",
//             name: user.name,
//             email: user.email
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(411).json({
//             message: "ERROR",
//             cause: error.message
//         });
//     }
// };
// export const userLogout = async (req, res, next) => {
//     try {
//         const user = await User.findById(res.locals.jwtData.id);
//         if (!user) {
//             return res.status(411).send("User does not exists or Token malfunctioned");
//         }
//         if (user._id.toString() !== res.locals.jwtData.id) {
//             return res.status(411).send("Permisions didn't match");
//         }
//         res.clearCookie(COOKIE_NAME, {
//             path: "/",
//             domain: "localhost",
//             httpOnly: true,
//             signed: true
//         });
//         res.status(200).json({
//             message: "Logged out successfully"
//         });
//     }
//     catch (error) {
//         console.log(error);
//         res.status(411).json({
//             message: "ERROR",
//             cause: error.message
//         });
//     }
// };



import User from "../models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.error(error);
        res.status(411).json({ message: "ERROR", cause: error.message });
    }
};

export const userSignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).send("User already exists");

        const hashedPassword = await hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = createToken(user._id.toString(), user.email, "30d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "go-gpt.onrender.com",
            expires,
            httpOnly: true,
            signed: true
        });

        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(411).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send("User does not exist");

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).send("Incorrect Password");

        const token = createToken(user._id.toString(), user.email, "30d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 30);

        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "go-gpt.onrender.com",
            expires,
            httpOnly: true,
            signed: true
        });

        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(411).json({ message: "ERROR", cause: error.message });
    }
};

export const verifyUser = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(411).send("User does not exist or Token malfunctioned");

        res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(411).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogout = async (req, res) => {
    try {
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "go-gpt.onrender.com",
            httpOnly: true,
            signed: true
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(411).json({ message: "ERROR", cause: error.message });
    }
};
// # sourceMappingURL=user-controllers.js.map
