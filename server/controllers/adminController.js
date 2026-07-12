const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalSales,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};