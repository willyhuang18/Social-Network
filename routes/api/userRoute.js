const router = require('express').Router();

// Set requirements
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
  } = require('../../controllers/userController');

//indicate the get and post route for user
router.route('/').get(getAllUsers).post(createUsers);

module.exports = router; 