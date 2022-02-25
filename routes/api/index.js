const router = require('express').Router();

// importing the user and thoughts route
const usersRoutes = require('./userRoute');
const thoughtsRoutes = require('./thoughtRoute');

// tell router to create user route
router.use('/users', usersRoutes);

// tell router to create thoughts route
router.use('/thoughts', thoughtsRoutes);


module.exports = router;