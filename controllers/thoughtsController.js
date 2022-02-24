const {Thoughts, Users} = require('../models');

module.exports ={
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
};