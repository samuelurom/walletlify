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
        currentPage: "",
        transactions,
        query,
      });
    }
  });
});

module.exports = router;
