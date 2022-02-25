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

//indicate the get and post route for user by ID
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

//indicate the get and post route for user's friend by ID
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)
module.exports = router; 