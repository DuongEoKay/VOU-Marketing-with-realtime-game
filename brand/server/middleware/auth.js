const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({success: false, message: 'Invalid access token'})
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.role = decodedToken.role
        req.id = decodedToken.id
        next()
    }
    catch(error) {
        console.log(error)
        return res.status(403).json({success: false, message: 'Invalid token'})
    }
}

module.exports = verifyToken