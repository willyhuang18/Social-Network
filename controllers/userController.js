const {Users} = require('../models/user');


module.exports ={
    // get all User
    getAllUsers(req, res) {
        Users.find({})
        // using populate method to get the reference documents 
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Get user by ID
    getUsersById(req, res) {
        Users.findOne({_id: req.params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        // return if no user is found 
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'No User is found with this ID!'});
                return; 
            }
            res.json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
     // Update User by ID
    updateUsers(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'No User is found with this ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.json(err))
    },
    // Delete a current user by ID
    deleteUsers(req, res) {
        Users.findOneAndDelete({_id: req.params.id})
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'No User is found with this ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    },
    // adding the friend by ID
    addFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, {$push: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'No User is found with this ID!'});
                return;
            }
        res.json(response);
        })
        .catch(err => res.json(err));
    },

    // Delete a Friend
    deleteFriend(req, res) {
        Users.findOneAndUpdate({_id: req.params.id}, {$pull: { friends: req.params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'No User is found with this ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    },
};