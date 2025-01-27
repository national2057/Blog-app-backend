const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // generate token
    const token = req.cookies.token;
    // check token
    if (!token) {
      return res.status(401).json({
        message: " User not Authenticated.",
        success: false,
      });
    };
    // verify token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token!",
        success: false,
      });
    };
   //  Attach userId to request object
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error!!",
      success: false,
    });
  };
};

module.exports = { isAuthenticated };
