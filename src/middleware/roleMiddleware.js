const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({Message:'Access denied'})
        }
        next();
    };
}

module.exports = authorizeRoles;