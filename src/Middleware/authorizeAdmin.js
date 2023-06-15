var jwt=require('jsonwebtoken')

const adminToken=function(req,res,next){
    const authHeader=req.headers.authorization
    if(authHeader==undefined){
        res.status(404).json({status:"failure",message:"no token provided "})
    }
    let token=authHeader.split(" ")[1]
    jwt.verify(token,'admin',(err)=>{
        if(err){
            res.json({status:"failure",message:"invalid user"})
        }
        next()
    })

}
module.exports=adminToken