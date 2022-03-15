const {
    verifyToken,
    isAdmin,
    isEmployee,
    isBilling
} =  require('./authJwt')

module.exports = {verifyToken, isAdmin, isEmployee, isBilling}