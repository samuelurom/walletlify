const db = require("../db");

function setCurrentUser(req, res, next) {
  if (req.session && req.session.userId) {
    const sql = `
      SELECT u.id, u.full_name, u.email, u.profile_image_url, c.name AS currency_name, c.symbol AS currency_symbol
      FROM users AS u
      LEFT JOIN currencies AS c ON u.currency_id = c.id
      WHERE u.id = $1;
    `;

    db.query(sql, [req.session.userId], (err, dbRes) => {
      if (err) {
        console.log(err);
        res.send("Something went wrong...");
      } else {
        res.locals.currentUser = dbRes.rows[0];
        next();
      }
    });
  } else {
    next();
  }
}

module.exports = setCurrentUser;
