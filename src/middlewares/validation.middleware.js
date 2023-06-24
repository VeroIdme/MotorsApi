const { body, validationResult } = require("express-validator")

const validFields = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            status: "Error",
            errors: errors.mapped()
        })
       
    }
    next()
}
exports.createUserFields = [
    body("name")
        .notEmpty()
        .withMessage("This field is required, please to enter your name"),
    body("email")
        .notEmpty()
        .withMessage("This field is required, please to enter your email")
        .isEmail()
        .withMessage("It not email, please to enter a correct email"),
    body("password")
        .notEmpty()
        .withMessage("This field is required, please to enter your password")
        .isLength({min: 8})
        .withMessage("The length is short, the min is 8 characters")
        .isLength({max: 15})
        .withMessage("The length is large, the max is 15 characters"),
    validFields
]
exports.loginUser = [
    body("email")
        .notEmpty()
        .withMessage("This field is required, please to enter your email")
        .isEmail()
        .withMessage("It not email, please to enter a correct email"),
    body("password")
        .notEmpty()
        .withMessage("This field is required, please to enter your password")
        .isLength({min: 8})
        .withMessage("The length is short, the min is 8 characters")
        .isLength({max: 15})
        .withMessage("The length is large, the max is 15 characters"),
    validFields

]
exports.updatePassword = [
    body("currentPassword")
        .notEmpty()
        .withMessage("This field is required, please to enter your password")
        .isLength({min: 8})
        .withMessage("The length is short, the min is 8 characters")
        .isLength({max: 15})
        .withMessage("The length is large, the max is 15 characters"),
    body("password")
        .notEmpty()
        .withMessage("This field is required, please to enter your password")
        .isLength({min: 8})
        .withMessage("The length is short, the min is 8 characters")
        .isLength({max: 15})
        .withMessage("The length is large, the max is 15 characters"),
    validFields
]
exports.createRepairFields = [
     body("date")
        .notEmpty()
        .withMessage("This field is required, please to enter a correct date")
        .isDate()
        .withMessage("The date it not correct, to enter a date correct"),
    body("motorsNumber")
        .notEmpty()
        .withMessage("This field is required, please to enter a number"),
    body("description")
        .notEmpty()
        .withMessage("This field is required, please to enter a description"),
    validFields
]