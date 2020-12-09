const router = require('express').Router();

const apiPerrosRouter = require('./api/perros');
const apiProtectorasRouter = require('./api/protectoras');
const apiAdoptantesRouter = require('./api/adoptantes');

router.use('/perros', apiPerrosRouter);
router.use('/protectoras', apiProtectorasRouter);
router.use('/adoptantes', apiAdoptantesRouter);

module.exports = router;