const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.headers["token-key"];

  jwt.verify(Token, "SecretKey", (err, decoded) => {
    if (err) {
      res.status(401).json({ status: "failed", data: err });
    } else {
       let username = decoded["data"]["UserName"];
       req.headers.username = username;
      next();
    }
  });
};
