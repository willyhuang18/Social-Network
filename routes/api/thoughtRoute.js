const router = require('express').Router();

// Set requirements
const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtsController');

//indicate the get and post route for thoughts
router.route('/').get(getAllThoughts);

//indicate the route for thoughts by ID 
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

//post route for create new thought
router.route('/:userId').post(createThoughts);

//post route for create new reaction
router.route('/:thoughtId/reactions').post(addReaction);

module.exports = router;