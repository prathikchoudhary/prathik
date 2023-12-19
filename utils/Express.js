class ExpressError extends Error {
    constructor(stautsCode,message){
        super();
        this.stautsCode = stautsCode;
        this.message = message;
    }
}
module.exports = ExpressError;