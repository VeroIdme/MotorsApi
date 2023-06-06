const User = require("../models/user.model")

/* Funciones  */
exports.findUsers = async (req, res) => {
    const time = req.requestTime
    const users = await User.findAll({
        where: {
            status: true,
        }
    })

    return res.json({
        requestTime: time,
        results: users.length,
        status: "Success",
        message: "users found",
        users,
    })
}

exports.findUser = async (req, res) => {
    try {
        const { id } = req.params
        
        const user = await User.findOne({
            where: {
                id,
                status: true,
            }
        })
      
        if (!user) {
            return res.status(404).json({
                message: "The user with the one not found"
            })
        }
        
        return res.json({
            status: "Success",
            message: "User found",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}


exports.createUsers = async (req, res) => {
    try {
        
        const { name, email, password, role } =
            req.body
        
        const user = await User.create({
            name,
            email,
            password,
            role,
        })
        
        return res.status(210).json({
            message: "The user has been created",
            user,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}

exports.updateUsers = async (req, res) => {
    try {
      
        const { id } = req.params
        
        const { name, email, password, role } = req.body
        
        const user = await User.findOne({
            where: {
                id,
                status: true,
            }
        })
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with ${id} not found`
            })
        }
        
        await user.update({ name, email, password, role })
        
        return res.status(200).json({
            status: "success",
            message: "the user has been updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}

exports.deleteUsers = async (req, res) => {
    try {
        
        const { id } = req.params

        
        const user = await User.findOne({
            where: {
                id,
                status: true,
            }
        })
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: `User with ${id} not found`
            })
        }
        
        await user.update({ status: false })
        
        return res.status(200).json({
            status: "success",
            message: "the user has been updated"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}