const {Thoughts, Users} = require('../models');

module.exports ={
    // Create  new thought
    createThoughts(req, res) {
        Thoughts.create(req.body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: req.params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(response => {
            if(!response) {
                res.status(404).json({message: 'No thoughts is found with this ID!'});
                return;
            }
            res.json(response)
        })
        .catch(err => res.json(err)); 
    },

    // Get all Thoughts
    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(response => res.json(response))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // Get thought by ID
    getThoughtsById(req, res) {
        Thoughts.findOne({ _id: req.params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(response => {
            if(!response) {
            res.status(404).json({message: 'No thoughts is found with this ID!'});
            return;
        }
        res.json(response)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // Update thought by ID
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'No thoughts is found with this ID!'});
                return;
            }
                res.json(response);
        })
        .catch(err => res.json(err));
    },

    // Delete thought by ID
    deleteThoughts(req, res) {
        Thoughts.findOneAndDelete({_id: req.params.id})
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'No thoughts is found with this ID!'});
                return;
            }
            res.json(response);
            })
            .catch(err => res.status(400).json(err));
    },
     // Add Reaction
     addReaction(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$push: {reactions: req.body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(response => {
        if (!response) {
            res.status(404).json({message: 'No thoughts is found with this ID!'});
            return;
        }
        res.json(response);
        })
        .catch(err => res.status(400).json(err))

    },

    // Delete reaction by ID
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: req.params.reactionId}}}, {new : true})
        .then(response => {
            if (!response) {
                res.status(404).json({message: 'No thoughts is found with this ID!'});
                return;
            }
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
    }
};