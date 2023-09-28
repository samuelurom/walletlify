function isAuthenticated(req, res, next) {
  if (req.session && req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = isAuthenticated;