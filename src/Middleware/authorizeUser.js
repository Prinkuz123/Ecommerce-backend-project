var jwt=require('jsonwebtoken')

let userToken=function(req,res,next){
    const authHeader=req.headers.authorization
    if(authHeader==undefined){
        res.status(404).json("no token provided")

    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,'user',(er)=>{
        if(error){
            res.json({status:"failure",message:"invalid user"})
        }
        next()
    })
}
module.exports=userToken