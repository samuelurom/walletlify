const express = require("express");
const bcrypt = require("bcrypt");

const upload = require("../middlewares/upload");

const db = require("../db");
const isAuthenticated = require("../middlewares/is-authenticated");

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

// GET /profile
router.get("/profile", isAuthenticated, (req, res) => {
  console.log(res.locals.currentUser);
  res.render("users/show", { currentPage: "" });
});

// GET /profile/edit
router.get("/profile/edit", isAuthenticated, (req, res) => {
  const sql = `
    SELECT id, name, symbol
    FROM currencies;
  `;

  db.query(sql, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      res.render("users/edit", {
        currentPage: "",
        currencies: dbRes.rows,
      });
    }
  });
});

// PUT /profile
router.post(
  "/profile",
  isAuthenticated,
  upload.single("profile_image"),
  (req, res) => {
    const { profile_image, full_name, email, prefarred_currency } = req.body;

    const sql = `
    UPDATE users
    SET full_name = $1, email = $2, profile_image_url = $3, currency_id = $4
    WHERE id = $5;
  `;

    const values = [
      full_name,
      email,
      req.file.path,
      prefarred_currency,
      res.locals.currentUser.id,
    ];

    db.query(sql, values, (err, dbRes) => {
      if (err) {
        console.log(err);
        res.send("Something went wrong...");
      } else {
        res.redirect("/profile");
      }
    });
  }
);

module.exports = router;
