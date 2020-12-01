const router = require('express').Router();

const apiPerrosRouter = require('./api/perros');
const apiProtectorasRouter = require('./api/protectoras');

router.use('./perros', apiPerrosRouter);
router.use('./protectoras', apiProtectorasRouter);

module.exports = router;