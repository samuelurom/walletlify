const express = require("express");
const isAuthenticated = require("../middlewares/is-authenticated");
const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

module.exports = router;
