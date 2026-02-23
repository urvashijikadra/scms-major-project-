const router = require("express").Router();

router.post("/login", (req, res) => {
  res.json({ message: "Login API working ✅", data: req.body });
});

module.exports = router;
