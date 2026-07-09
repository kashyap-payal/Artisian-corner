const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
console.log("addProduct:", typeof addProduct);
console.log("getProducts:", typeof getProducts);
console.log("getProductById:", typeof getProductById);
console.log("updateProduct:", typeof updateProduct);
console.log("deleteProduct:", typeof deleteProduct);
console.log("protect:", typeof protect);
console.log("authorize:", typeof authorize);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put(
  "/:id",
  protect,
  authorize("seller", "admin"),
  updateProduct
);
router.delete(
  "/:id",
  protect,
  authorize("seller", "admin"),
  deleteProduct
);
router.post(
  "/:id/review",
  protect,
  addReview
);
// Add Product (Only Seller)
router.post(
  "/add",
   protect,
  authorize("seller", "admin"),
  upload.single("image"),
  addProduct
);
 

module.exports = router;