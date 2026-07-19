import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "401 Akses ditolak! Token tidak valid!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    console.log("Error Verifikasi:", err.message);
    res.status(403).json({
      message: "403 Akses ditolak! token sudah expired atau tidak valid",
    });
  }
};
