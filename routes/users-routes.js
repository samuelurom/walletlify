const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// GET /signup form
router.get("/signup", (req, res) =>
  res.render("users/signup", { layout: "layouts/auth-layout" })
);

// POST /signup
router.post("/signup", (req, res) => {
  const { full_name, email, password } = req.body;
  const saltRounds = 12;

  const sql = `
    INSERT INTO users (full_name, email, password_hash)
    VALUES ($1, $2, $3);
  `;

  // Hashing password
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      db.query(sql, [full_name, email, hash], (err, dbRes) => {
        if (err) {
          console.log(err);
          res.send("Something went wrong...");
        } else {
          res.redirect("/login");
        }
      });
    });
  });
});

module.exports = router;
