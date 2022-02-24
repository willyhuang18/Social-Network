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
                res.status(404).json({message: 'No User with this particular ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.json(err))
    },
};