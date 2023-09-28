const express = require("express");
const db = require("../db");
const e = require("express");
const router = express.Router();

// GET /transactions
router.get("/", (req, res) => {
  const { userId } = req.session;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name, c.icon_url AS category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
    ORDER BY t.date DESC;
  `;

  db.query(sql, [userId], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const transactions = dbRes.rows;

      res.render("transactions", { currentPage: "transactions", transactions });
    }
  });
});

// POST /transactions
router.post("/", (req, res) => {
  const { userId } = req.session;
  const { amount, transaction_type, description, date, category } = req.body;

  const sql = `
    INSERT INTO transactions (amount, transaction_type, description, date, user_id, category_id)
    VALUES ($1, $2, $3, $4, $5, $6);
  `;

  const values = [
    Number(amount),
    transaction_type,
    description,
    date,
    userId,
    Number(category),
  ];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      res.redirect("/transactions");
    }
  });
});

// DELETE /transactions/:id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM transactions
    WHERE id = $1;
  `;

  console.log(id);

  db.query(sql, [id], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      res.redirect("/transactions");
    }
  });
});

module.exports = router;
