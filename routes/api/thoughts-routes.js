const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
}= require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts);

router
.route('/:id')
.get(getThoughtById)
.delete(deleteThought)
.post(updateThought);

router
.route('/:userId')
.post(createThought);

router
.route('/:thoughtsId/reactionsd')
.post(addReaction);

router
.route('/:thoughtsId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;