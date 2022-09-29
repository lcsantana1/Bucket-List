// Imports router
const router = require('express').Router();
// Imports api routes and home routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Combines those routes with the router
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Exports router
module.exports = router;
