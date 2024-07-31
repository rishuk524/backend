const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debug log

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token structure' });
    }

    req.user = { id: decoded.userId }; // Ensure `req.user.id` is set correctly
    console.log('Authenticated User:', req.user); // Confirm user id is available
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

module.exports = {
  jwtMiddleware
};
