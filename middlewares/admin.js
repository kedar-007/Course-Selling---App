const jwt = require("jsonwebtoken");

// destructuring the admin jwt secreat
const { Admin_JWT } = require("../config");

//function for the user middleware
async function adminMiddleware(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or malformed token" });
      }
  
      const token = authHeader.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, Admin_JWT);
  
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: "Invalid token payload" });
      }
  
      req.adminId = decoded.userId;
      next();
  
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized: " + err.message,
      });
    }
  }


module.exports = {
    adminMiddleware:adminMiddleware
}