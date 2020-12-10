const router = require('express').Router();

const apiPerrosRouter = require('./api/perros');
const apiProtectorasRouter = require('./api/protectoras');
const apiAdoptantesRouter = require('./api/adoptantes');
const apiPostsRouter = require('./api/posts');

router.use('/perros', apiPerrosRouter);
router.use('/protectoras', apiProtectorasRouter);
router.use('/adoptantes', apiAdoptantesRouter);
router.use('/posts', apiPostsRouter);

module.exports = router;