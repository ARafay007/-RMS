exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            console.log(error);    
            res.status(400).json({error: error.message || error})
        });
    }
};