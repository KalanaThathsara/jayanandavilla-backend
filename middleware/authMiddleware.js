const jwt = require('jsonwebtoken')
const env = require('../envVariables')

function authCustomer(req, res, next) {
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).send('Access Denied. Please Login to Continue')
    
    try{
        const decoded = jwt.verify(token, env.jewtKey)
        console.log(decoded)
        req.user = decoded
        next()
    }
    catch(ex) {
        res.status(400).send('Invalid Token.')
    }
    
}

module.exports = authCustomer