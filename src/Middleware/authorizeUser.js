var jwt=require('jsonwebtoken')

let userToken=function(req,res,next){
    const authHeader=req.headers.authorization
    if(authHeader==undefined){
        res.status(404).send("no token provided")

    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,'user',(er)=>{
        if(er){
            res.send("invalid user")
        }
        next()
    })
}
module.exports=userToken