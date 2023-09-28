const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("reports", { currentPage: "reports" });
});

module.exports = router;
