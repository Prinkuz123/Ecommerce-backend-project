const productData = require("../Model/Productschema");

//.........Adding products......

const addProduct = async (req, res) => {
  const product = new productData(req.body);
  try {
    item = await product.save();
    res.json(item);
  } catch (er) {
    console.log("error", er);
  }
};

// //........getall products.......
const getallProduct=async(req,res)=>{
  try{ 

    const products=await productData.find()
    res.send(products)
  }
  catch(er){
    console.log("error",er)
  }
 


}


//.......getproductbyId........

const getproductByid=async(req,res)=>{
  const productId=req.params.id
  console.log(productId)
  try
  
  {
    const allProductdata = await productData.findById(productId)
    res.send(allProductdata)
  }
  catch(er){
    console.log("error",er)
  }
}


//..........getProductbycategory........
const getprdctBycategory=async(req,res)=>{
  const Category=req.params.category
  try{
    const product= await productData.find({category:Category})
    if(product.length>0){
      res.send(product)
    }
    else
    res.send(`no products found in this category `)
  }

catch(er){
  console.log("error",er)
}
}


//...........updateproduct..............
const updateProduct=async(req,res)=>{
  const id=req.params.id
  const updatedDAta=req.body

  try{
    const product=await productData.findByIdAndUpdate(id,updatedDAta,{new:true})
    res.send(product)
  }
  catch(er){
    console.log("error",er)
  }
}




//.........delete a product........
const deleteProduct=async(req,res)=>{
  const id=req.params.id

try{
  const product=await productData.findOneAndDelete(id)
  res.send(product)

}
catch(er){
  console.log("error",er)
}}


module.exports = { addProduct ,getallProduct,getproductByid,getprdctBycategory,updateProduct,deleteProduct}