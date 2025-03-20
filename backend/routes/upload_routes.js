const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Import controllers here (to be implemented later)
const { 
  uploadCSV, 
  // getUploads, 
  // getUploadById, 
  // getDistributionByUploadId 
} = require('../controllers/upload_controller');

// Routes
router.post('/', protect,  uploadCSV );
// router.get('/', protect,  getUploads );
// router.get('/:id', protect,  getUploadById );
// router.get('/:id/distribution', protect,  getDistributionByUploadId );

module.exports = router; 