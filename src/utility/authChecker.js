const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    if (user) {
      req.decodedToken = user;
      next();
    } else {
      return res.status(400).json({
        message: "something wrong with token",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "something wrong with token",
    });
  }
};

module.exports = checkAuth;
