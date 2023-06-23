class AppError extends Error {

    constructor(messagge, statusCode){
        super(messagge)
        this.statusCode= statusCode
        this.status= `${statusCode}`.startsWith('4')? "error":"fail"
        this.messagge= messagge
        this.isOperational= true

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError