const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("users/login", { layout: "layouts/auth-layout" });
});

router.post("/login", (req, res) => {
  res.send("Loging in...");
});

router.delete("/logout", (req, res) => {
  res.send("Logging out...");
});

module.exports = router;
