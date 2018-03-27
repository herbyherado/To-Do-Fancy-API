const jwt = require('jsonwebtoken');

module.exports = {
    auth(req,res,next){
        // console.log(req)
        console.log(req.headers)
        // if(req.headers.token !== 'null'){
        //     const token = req.headers.token
        //     let decode = jwt.verify(token,'secret')
        //     console.log('ini decode ==============',decode)
        //     // console.log('-------------------')
        //    next()
        // } else {
        //     next('error')
        // }
    }
}