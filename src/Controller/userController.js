const userSchema = require('../Model/Userschema')



//uesrregister
const userRegister=async(req,res)=>{
    try{
        let Username=req.body.username
        
        const User=await userSchema.findOne({username:Username})


        if(User){
            res.send("this user already exist")
        }
        
        const newUser= new userSchema(req.body)
     await newUser.save()

     res.send("USer registered successfully,please login to continue")
    }
    catch(er){console.log("error",er)}

}







// user login
const userLogin=async(req,res)=>{
    try{
        let Username=req.body.username
        const Password=req.body.password
        const User=await userSchema.findOne({username:Username})
if(!User){
    res.send("User not found")
    }
    else{ 
        if(Password==User.password)
        {
            res.send("user login successful")
        }
        else{
            res.send("password mismatch")
        }
    }
    
       
    
  
}
catch(er){console.log("Error",er)}
}



module.exports={userRegister,userLogin}