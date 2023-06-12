const Repair = require("../models/repair.model")

/* Funciones  */
exports.findRepairs = async (req, res) => {
    const time = req.requestTime
    const repairs = await Repair.findAll({
        where: {
            status: true,
        }
    })

    return res.json({
        requestTime: time,
        results: users.length,
        status: "Success",
        message: "Repair found",
        repairs,
    })
}

exports.findRepair = async (req, res) => {
    try {
        const { id } = req.params
        
        const repair = await Repair.findOne({
            where: {
                id,
                status: true,
            }
        })
      
        if (!repair) {
            return res.status(404).json({
                message: "The repair with the one not found"
            })
        }
        
        return res.json({
            status: "Success",
            message: "repair found",
            repair,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}


exports.createRepairs = async (req, res) => {
    try {
        
        const { date, userId } =
            req.body
        
        const repair = await Repair.create({
            date,
            userId,
        })
        
        return res.status(210).json({
            message: "The repair has been created",
            repair,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}

exports.updateRepairs = async (req, res) => {
    try {
      
        const { id } = req.params
        
        const { date, userId } = req.body
        
        const repair = await Repair.findOne({
            where: {
                id,
                status: "pending",
            }
        })
        
        if (!repair) {
            return res.status(404).json({
                status: "error",
                message: `Repair with ${id} not found`
            })
        }
        
        await repair.update({ status: "completed" })
        
        return res.status(200).json({
            status: "success",
            message: "the repair has been updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}

exports.deleteRepairs = async (req, res) => {
    try {
        
        const { id } = req.params

        
        const repair = await Repair.findOne({
            where: {
                id,
                status: "pending",
            }
        })
        
        if (!repair) {
            return res.status(404).json({
                status: "error",
                message: `Repair with ${id} not found`
            })
        }
        
        await repair.update({ status: "cancelled" })
        
        return res.status(200).json({
            status: "success",
            message: "the repair has been updated"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Something went very bad",
        })
    }
}