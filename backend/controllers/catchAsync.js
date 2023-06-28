exports.catchAsync = (fn) => {
    return (req, res) => {
        fn(req, res).catch(error => res.status(400).json({error}));
    }
};