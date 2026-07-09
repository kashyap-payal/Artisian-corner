const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("==============");
    console.log("Allowed:", roles);
    console.log("User:", req.user);
    console.log("User Role:", req.user.role);

    if (!roles.includes(req.user.role)) {
      console.log("❌ ACCESS DENIED");
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    console.log("✅ ACCESS GRANTED");
    next();
  };
};

module.exports = authorize;