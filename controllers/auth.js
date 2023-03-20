const forAdmin = (req, res, next) => {
  let user = req.session.user || "";
  if (user) next();
  else res.redirect("/forbidden");
};

export default forAdmin;
