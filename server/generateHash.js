const bcrypt = require("bcryptjs");

async function generateHash() {
  const password = "123456"; // New password
  const hash = await bcrypt.hash(password, 10);

  console.log("New Password:", password);
  console.log("Hash:");
  console.log(hash);
}

generateHash();