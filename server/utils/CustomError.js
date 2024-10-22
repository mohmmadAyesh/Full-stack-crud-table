class CustomError extends Error{
    constructor(message, statusCode=500, success=false){
        super(message);
        this.statusCode=statusCode;
        this.success=success;
    }
}
module.exports=CustomError;