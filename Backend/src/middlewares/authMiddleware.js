const authMiddleware = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  const userEmail = req.headers["x-user-email"];

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  req.user = {
    id: userId,
    email: userEmail,
  };

  next();
};

module.exports = authMiddleware;