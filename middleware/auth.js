const jwt = require("jsonwebtoken");
const CustomApIError = require("../errors/custom-error");
const { UnauthenticatedError, CustomAPIError } = require("../errors/");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Not Token Provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // cons ole.log("Decoded", decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not Authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
