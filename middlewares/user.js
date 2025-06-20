const jwt = require("jsonwebtoken");

// destructuring the admin jwt secreat
const { JWT_USER_SECREAT } = require("../config");

//function for the user middleware
async function userMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader || authHeader.starsWith("Bearer")){
    return res.status(401).json({
      message:"Missin or Malformed token"
    })
  }

  const token = authHeader.spilt(" ")[1];
  
  const decode = jwt.verify(token, JWT_USER_SECREAT);

  if (!decode || decode.id) {
    return (
      res.status(401),
      json({
        message: "You are not signed in",
      })
    );
  }

  req.userId = decode.id;
  next();
}

module.exports = {
    userMiddleware:userMiddleware
}
