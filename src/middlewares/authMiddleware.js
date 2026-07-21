// dependecies
import jwt from "jsonwebtoken";
import Joi from "joi";
import rateLimit from "express-rate-limit";

// rate limiter
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    status: "Error",
    message: "Too many registration attempts, please try again later.",
  },
});

export const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: {
    status: "Error",
    message: "Too many attempts! Please wait another 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// verify token handler
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "401 Access denied! Invalid token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    console.log("Error Verifikasi:", err.message);
    res.status(403).json({
      message: "403 Access denied! The token has expired or is invalid.",
    });
  }
};

// validate user input handler
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format!",
    "any.required": "Email is required!",
  }),
  password: Joi.string().min(8).pattern(passwordRegex).required().messages({
    "string.patter.base":
      "The password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 symbol!",
    "string.min": "Password must be at least 8 characters long!",
  }),
});

export const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ status: "Error", message: error.details[0].message });
  }
  next();
};
