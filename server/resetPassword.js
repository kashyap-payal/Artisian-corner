const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("123456", 10);

    const user = await User.findOneAndUpdate(
      { email: "kashyappayal654@gmail.com" },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      console.log("User not found");
    } else {
      console.log("Password reset successfully!");
      console.log("Email:", user.email);
      console.log("New Password: 123456");
    }

    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

resetPassword();