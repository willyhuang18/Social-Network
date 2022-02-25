const router = require('express').Router();

// Import all route from Api folder
const apiRoutes = require('./api');

// tell express to use api route
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send(console.log('There is error with the route'));
  });


module.exports = router;