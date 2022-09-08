const { Thought, User } = require('../models');

// THOUGHTS PART OF CONTROLLER
const thoughtsController = {

    getAllThoughts(req, res) {
        Thought.find({})
        .sort({ _id: -1 })
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    
    createThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.UserId },
                { $push: { thoughts: _id }},
                { new: true, runValidators: true }
            );
        })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    },

    
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts); 
        })
        .catch(err => res.status(400).json(err));
    },
    
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    },


    // REACTIONS PART OF CONTROLLER
    addReaction({ params, body }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { thoughts: _id }},
            { new: true, runValidators: true }
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err))
    },

    deleteReaction({ params, body }, res) {
        Reaction.findOneAndDelete({ _id: params.id })
        .then(dbThoughts => {
            if (!dbThoughts) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return
        }
        res.json(dbThoughts);
        })
        .catch(err => res.status(400).json(err));
    }

}

module.exports = thoughtsController;