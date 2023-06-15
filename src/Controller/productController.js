const productData = require("../Model/Productschema");

//.........Adding products......

const addProduct = async (req, res) => {
  const product = new productData(req.body);
  
    const item = await product.save();
    res.json(item);
  
};

// //........getall products.......
const getAllProduct = async (req, res) => {
  
    const products = await productData.find();
    res.json(products);
 
};

//.......getproductbyId........

const getProductById = async (req, res) => {
  const productId = req.params.id;
  
    const allProductdata = await productData.findById(productId);
    res.json(allProductdata);

};

//..........getProductbycategory........
const getPrdctByCategory = async (req, res) => {
  const Category = req.params.category;
  
    const product = await productData.find({ category: Category });
    if (product.length > 0) {
      res.json(product);
    } else res.json(`no products found in this category `);

};

//...........updateproduct..............
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const updatedDAta = req.body;

  
    const product = await productData.findByIdAndUpdate(id, updatedDAta, {
      new: true,
    });
    res.json(product);

};

//.........delete a product........
const deleteProduct = async (req, res) => {
  const id = req.params.id;

  
    const product = await productData.findOneAndDelete(id);
    res.json(product);
 
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  getPrdctByCategory,
  updateProduct,
  deleteProduct,
};
