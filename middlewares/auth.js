const jwt = require('jsonwebtoken');

module.exports = {
    authentication(req, res, next) {
        console.log(req)
        if (req.headers.token !== 'null') {
            const token = req.headers.token
            let decode = jwt.verify(token, process.env.SECRET)
            console.log(decode)
            next()
        } else {
            next('error')
        }
    }
}