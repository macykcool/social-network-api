const router = require('express').Router();

const thoughtsRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;