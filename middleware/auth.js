const jwt = require('jsonwebtoken');

module.exports = {
    auth(req,res,next){
        console.log(req)
        if(req.headers.token !== 'null'){
            const token = req.headers.token
            let decode = jwt.verify(token,'secret')
            console.log(decode)
           next()
        } else {
            next('error')
        }
    }
}
