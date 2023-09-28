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

      res.render("transactions/list", {
        currentPage: "transactions",
        transactions,
      });
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

// GET /transactions/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.description, t.date, c.name AS category_name, c.icon_url AS category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.id = $1;
  `;

  db.query(sql, [id], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const transaction = dbRes.rows[0];

      res.render("transactions/show", { currentPage: "", transaction });
    }
  });
});

// GET /transactions/:id/edit
router.get("/:id/edit", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT * FROM transactions
    WHERE id = $1;
  `;

  db.query(sql, [id], (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const transaction = dbRes.rows[0];

      res.render("transactions/edit", { currentPage: "", transaction });
    }
  });
});

// PUT /transactions/:id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount, transaction_type, description, date, category } = req.body;

  const sql = `
    UPDATE transactions
    SET amount = $1, transaction_type = $2, description = $3, date = $4, category_id = $5
    WHERE id = $6;
  `;

  const values = [
    Number(amount),
    transaction_type,
    description,
    date,
    Number(category),
    id,
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
