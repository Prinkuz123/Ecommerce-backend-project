var jwt=require('jsonwebtoken')

const adminToken=function(req,res,next){
    const authHeader=req.headers.authorization
    if(authHeader==undefined){
        res.status(404).send("no token provided ")
    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,'admin',(err)=>{
        if(err){
            res.send("invalid user")
        }
        next()
    })

}
module.exports=adminToken