const router = require('express').Router();

// Import all route from Api folder
const apiRoutes = require('./api');

// tell express to use api route
router.use('/api', apiRoutes);

// Module exports router
module.exports = router;