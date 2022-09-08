const router = require('express').Router();
// const { model } = require('mongoose');
// const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
// router.use('/thoughts', thoughtsRoutes);

module.exports = router;