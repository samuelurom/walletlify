const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// GET /login form
router.get("/login", (req, res) => {
  res.render("users/login", { layout: "layouts/auth-layout" });
});

// POST /login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT * FROM users WHERE email = $1;
  `;

  db.query(sql, [email], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      if (dbRes.rows.length === 0) {
        res.send("We can't find a user with that email");
      } else {
        const user = dbRes.rows[0];

        bcrypt.compare(password, user.password_hash, function (err, isSame) {
          if (isSame) {
            req.session.userId = user.id;
            res.redirect("/");
          } else {
            res.send("Wrong password");
          }
        });
      }
    }
  });
});

// DELETE /logout
router.delete("/logout", (req, res) => {
  res.send("Logging out...");
});

module.exports = router;
