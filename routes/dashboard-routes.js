const express = require("express");
const db = require("../db");

const isAuthenticated = require("../middlewares/is-authenticated");

const router = express.Router();

router.get("/", isAuthenticated, (req, res) => {
  const { userId } = req.session;
  const sql = `
    SELECT t.id, t.amount, t.transaction_type, t.date, c.name AS category_name, c.icon_url AS category_icon
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = $1
    AND t.date >= CURRENT_DATE - INTERVAL '30 days'
    ORDER BY t.date DESC;
  `;
  const values = [userId];

  db.query(sql, values, (err, dbRes) => {
    if (err) {
      console.log(err);
      res.send("Something went wrong");
    }

    const transactions = dbRes.rows;

    res.render("dashboard", { currentPage: "dashboard", transactions });
  });
});

module.exports = router;
