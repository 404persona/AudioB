const ProductSchema = require("../Schemas/productSchema");
const path = require("path");

const RegisterProduct = async (req, res, files) => {
  try {
    const { name, shortdescription, description, price, category } = req.body;
    const uploadedImages = req.files.map((file) => file.filename);
    const uploadProduct = new ProductSchema({
      name,
      shortdescription,
      description,
      price,
      category,
      image: uploadedImages,
    });
    console.log("Uploaded Files :", req.files);
    // console.log('FormData :', formData)
    const uploadedProduct = await uploadProduct.save();
    res.send({ Message: "Product Uploaded", uploadedProduct });
  } catch (error) {
    console.log(error);
  }
};
const GetProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

const GetProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await ProductSchema.findById(productId);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await ProductSchema.findByIdAndDelete(productId);
    res.send(deletedProduct);
  } catch (error) {
    console.log(error);
  }
}
const AddReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Validate rating (optional)
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).send('Invalid rating. Please enter a number between 1 and 5.');
    }

    // Sanitize comment (optional)
    // You can use a library like xss-clean or built-in methods

    const product = await ProductSchema.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).send('Product already reviewed');
    }

    const review = {
      user: req.user.id,
      name: req.user.username,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);

    // Update product data using Mongoose middleware (optional)
    // You can explore pre-save hooks to streamline this logic

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).send({
      message: 'Review added successfully!',
      product, // Include the updated product data in the response
    });
  } catch (error) {
    console.error(error);

    // Provide more specific error messages for debugging
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid product ID');
    }

    res.status(500).send('Server error. Please try again later.');
  }
};


module.exports = { RegisterProduct, GetProducts, GetProductById, DeleteProduct, AddReview };
