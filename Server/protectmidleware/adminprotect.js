import jwt from "jsonwebtoken";
import User from "../schema/userschema.js";

const Authorize = (roles) => {
  return async (req, res, next) => {
    try {
      const authToken = req?.headers?.authorization;

      if (!authToken) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      const tokenParts = authToken.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer" || !tokenParts[1]) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      const decodedUser = jwt.verify(tokenParts[1], process.env.JWT_SECRET_KEY);
      if (!decodedUser) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      let existingUser = await User.findById(decodedUser.id).exec();
      if (!existingUser) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      if (roles && roles.length > 0) {
        const userHasRequiredRole = roles.some((role) => existingUser.role.includes(role));
        if (!userHasRequiredRole) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized access!",
          });
        }
      }

      req.user = existingUser;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

export default Authorize;
