const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

router.post("/", upload.any(), (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files);

  res.json({
    body: req.body,
    files: req.files,
  });
});
module.exports = router;