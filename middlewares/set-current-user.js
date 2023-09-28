const db = require("../db");

function setCurrentUser(req, res, next) {
  if (req.session && req.session.userId) {
    const sql = `
      SELECT * FROM users WHERE id = $1;
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
