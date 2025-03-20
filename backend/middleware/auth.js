// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Protect routes
// exports.protect = async (req, res, next) => {
//   try {
//     let token;
    
//     // Get token from header
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }
    
//     // Check if token exists
//     if (!token) {
//       return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
//     }
    
//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Get user from database
//       req.user = await User.findById(decoded.id);
      
//       if (!req.user) {
//         return res.status(401).json({ success: false, message: 'User not found' });
//       }
      
//       next();
//     } catch (err) {
//       return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
//     }
//   } catch (err) {
//     next(err);
//   }
// };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      // Attach user info to request
      req.user = user;
      req.body.userId = user._id; // Adding user ID to request body

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
  } catch (err) {
    next(err);
  }
};
