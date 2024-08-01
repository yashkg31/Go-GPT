import {body, ValidationChain, validationResult} from 'express-validator'

export const validate = (validations : ValidationChain[]) => {
    return async (req, res, next) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(result.isEmpty()) break;
        }

        const errors = validationResult(req);

        if(errors.isEmpty())
            return next();

        res.status(422).json({
            errors: errors.array()
        })
    }
}

export const loginValidator = [
    
    body("email")
        .trim()
        .isEmail()
        .notEmpty()
        .withMessage("Email is required"),

    body("password")
        .notEmpty()
        .isLength({min : 6})
        .withMessage("Enter a valid password"),
] 

export const signUpValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    ...loginValidator
] 

export const chatCompletionValidator = [
    body("message")
        .notEmpty()
        .withMessage("Message is required"),

] 