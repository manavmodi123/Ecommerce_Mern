// Importing required packages and modules
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const stripe = require("stripe")("sk_test_51PKfw0SDNrzV9IQG6HzMIYYIzVY51mGRAtvAPrJfoil4A2VaI94srRDjVnhDnfX4RB8v7HyoiL5yDss5u39f64Bc00pp4o9rfS");

// Setting up port and middleware
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://manavmodi:modi304305@cluster0.jc70ucg.mongodb.net/e-commerce", {

});

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const Users = mongoose.model("Users", userSchema);

// Product Schema and Model
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

// Product Detail Subschema
const productDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Order Details Schema and Model
const orderDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  productDetails: {
    type: [productDetailSchema],
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "Paid",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

// Middleware to fetch user details from token
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ error: "Please Authenticate using valid token" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).send({ error: "Please Authenticate using valid token" });
  }
};

// Multer configuration for file upload
const upload = multer({
  limits: {
    fileSize: 1000000, // Max file size 1MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

// Route: User Login
app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: User Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await Users.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    // Initialize empty cartData
    let cartData = {};
    for (let i = 0; i < 300; i++) {
      cartData[i] = 0;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new Users({
      name: username,
      email,
      password: hashedPassword,
      cartData,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: Upload Product Image
app.post("/image", upload.single("product"), async (req, res) => {
  try {
    const imageBuffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    // Save image to disk or cloud storage and send response
    res.json({
      success: true,
      message: "Image uploaded successfully",
      image_url: `http://localhost:${port}/images/${req.file.originalname}`,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: Delete Product
app.post("/deleteproduct", async (req, res) => {
  try {
    const { id, name } = req.body;
    await Product.findOneAndDelete({ id });
    res.json({ success: true, name });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: Get All Products
app.get("/getallproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: New Collection Products
app.get("/newcollection", async (req, res) => {
  try {
    const products = await Product.find({});
    const newCollection = products.slice(1).slice(-8); // Assuming "new collection" logic
    res.json(newCollection);
  } catch (error) {
    console.error("New collection error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: Popular Products in Women Category
app.get("/popularinwomen", async (req, res) => {
  try {
    const products = await Product.find({ category: "Women" });
    const popularInWomen = products.slice(0, 4); // Assuming "popular in women" logic
    res.json(popularInWomen);
  } catch (error) {
    console.error("Popular in women error:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Route: Order Details
app.post("/orderDetails", fetchUser, async (req, res) => {
  try {
    const { orderDetails, totalAmount } = req.body;

    if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return res.status(400).json({ error: "Invalid order details data" });
    }

    const orders = orderDetails.map((item) => {
      const { image, name, category, oldPrice, newPrice, quantity } = item;

      if (!image || !name || !category || oldPrice === undefined || newPrice === undefined || quantity === undefined) {
        throw new Error("Invalid order data");
      }

      return {
        name,
        image,
        category,
        new_price: newPrice,
        old_price: oldPrice,
        quantity,
      };
    });

    const newOrder = new OrderDetails({
      userId: req.user.id,
      productDetails: orders,
      totalAmount,
      orderStatus: "Pending",
      paymentStatus: "Paid",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order details error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Get User Profile Details
app.post("/getProfileDetails", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    res.json(userData);
  } catch (error) {
    console.error("Get profile details error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Get User Cart Details
app.post("/getCartDetails", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  } catch (error) {
    console.error("Get cart details error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Add Product to Cart
app.post("/addtoCart", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Delete Product from Cart
app.post("/deletefromCart", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.json({ success: true, message: "Item deleted from cart" });
  } catch (error) {
    console.error("Delete from cart error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Add New Product
app.post("/addproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
      id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route: Create Checkout Session
app.post("/create-checkout-session", fetchUser, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    console.log("Received products:", products);
    console.log("Total amount:", totalAmount);

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const lineItems = products.map((product) => {
      if (!product.newPrice || !product.quantity) {
        throw new Error(`Invalid price or quantity value for product ${product.name}`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.newPrice * 100),
        },
        quantity: product.quantity,
      };
    });

    console.log("Line items:", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Create checkout session error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});




// Serve static images
app.use("/images", express.static("images"));

// Default route
app.get("/", (req, res) => {
  res.send("Express is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
