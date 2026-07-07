const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome!",
    user: req.user,
  });
});
router.get(
  "/admin",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin!",
    });
  }
);
module.exports = router;