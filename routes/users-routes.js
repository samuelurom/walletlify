const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) =>
  res.render("users/signup", { layout: "layouts/auth-layout" })
);

router.post("/signup", (req, res) => {
  res.send("Signing up...");
});

module.exports = router;
