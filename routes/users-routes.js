const express = require("express");
const bcrypt = require("bcrypt");

const upload = require("../middlewares/upload");
const isAuthenticated = require("../middlewares/is-authenticated");

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

// GET /profile
router.get("/profile", isAuthenticated, (req, res) => {
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

    let sql;
    let values;

    if (req.file) {
      uploadedFile = req.file.path;
      sql = `
        UPDATE users
        SET full_name = $1, email = $2, profile_image_url = $3, currency_id = $4
        WHERE id = $5;
      `;
      values = [
        full_name,
        email,
        uploadedFile,
        prefarred_currency,
        res.locals.currentUser.id,
      ];
    } else {
      sql = `
        UPDATE users
        SET full_name = $1, email = $2, currency_id = $3
        WHERE id = $4;
      `;
      values = [
        full_name,
        email,
        prefarred_currency,
        res.locals.currentUser.id,
      ];
    }

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

// GET /profile/password
router.get("/profile/password", isAuthenticated, (req, res) => {
  res.render("users/change-password", { currentPage: "" });
});

// PUT /profile/password
router.put("/profile/password", isAuthenticated, (req, res) => {
  const userId = res.locals.currentUser.id;
  const { old_password, new_password } = req.body;

  const sql = `
    SELECT password_hash
    FROM users
    WHERE id = $1;
  `;

  db.query(sql, [userId], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const passwordHash = dbRes.rows[0].password_hash;

      bcrypt.compare(old_password, passwordHash, function (err, isSame) {
        if (isSame) {
          const saltRounds = 12;
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(new_password, salt, function (err, hash) {
              // Update user record with hash password.
              const sql = `
                UPDATE users
                SET password_hash = $1
                WHERE id = $2;
              `;

              db.query(sql, [hash, userId], (err, dbRes) => {
                if (err) {
                  console.log(err);
                  res.send("Something went wrong...");
                } else {
                  res.redirect("/profile");
                }
              });
            });
          });
        } else {
          res.redirect("/profile/password");
        }
      });
    }
  });
});

module.exports = router;
