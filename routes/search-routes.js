const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /search
router.get("/", (req, res) => {
  const { userId } = req.session;
  const { query } = req.query;

  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name, c.icon_url AS category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE LOWER(t.description) LIKE $1 OR LOWER(c.name) LIKE $2
    AND t.user_id = $3
    ORDER BY t.date DESC;
  `;

  const values = [
    `%${query.toLowerCase()}%`,
    `%${query.toLowerCase()}%`,
    userId,
  ];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const transactions = dbRes.rows;

      res.render("search/list", {
        currentPage: "search",
        transactions,
        query,
      });
    }
  });
});

// GET /search/filter
router.get("/filter", (req, res) => {
  const { userId } = req.session;
  const {
    transactionType,
    incomeCategory,
    expenseCategory,
    minAmount,
    maxAmount,
    startDate,
    endDate,
  } = req.query;

  let sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name, c.icon_url AS category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
  `;

  let values = [userId];

  // Add user filters to the SQL query
  if (transactionType) {
    values.push(transactionType);
    sql += ` AND t.transaction_type = $${values.length}`;
  }

  if (incomeCategory && expenseCategory) {
    values.push(incomeCategory, expenseCategory);
    sql += ` AND t.category_id IN ($${values.length - 1}, $${values.length})`;
  } else if (incomeCategory) {
    values.push(incomeCategory);
    sql += ` AND t.category_id = $${values.length}`;
  } else if (expenseCategory) {
    values.push(expenseCategory);
    sql += ` AND t.category_id = $${values.length}`;
  }

  if (minAmount) {
    values.push(minAmount);
    sql += ` AND t.amount >= $${values.length}`;
  }

  if (maxAmount) {
    values.push(maxAmount);
    sql += ` AND t.amount <= $${values.length}`;
  }

  if (startDate) {
    values.push(startDate);
    sql += ` AND t.date >= $${values.length}`;
  }

  if (endDate) {
    values.push(endDate);
    sql += ` AND t.date <= $${values.length}`;
  }

  // Add ORDER BY clause to the SQL query
  sql += ` ORDER BY t.date DESC;`;

  console.log(sql, values);

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong...");
    } else {
      const transactions = dbRes.rows;

      res.render("search/list", {
        currentPage: "filter",
        transactions,
      });
    }
  });
});

module.exports = router;
