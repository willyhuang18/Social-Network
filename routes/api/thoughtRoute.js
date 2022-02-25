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


module.exports = router;