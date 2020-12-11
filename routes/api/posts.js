const router = require('express').Router();


const { getAllPosts, getByCategory, getPostByDate, countPost, getPostTitle } = require('../../models/post');

// Recupero todos los posts
router.get('/', async (req, res) => {
    try {
        const rows = await getAllPosts();
        res.json(rows);
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});

// Recupero por categoria
router.get('/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const posts = await getByCategory(categoria);
        res.json(posts);
    } catch (error) {
        res.json({ error: error.message })
    }
});

// Repuro post mas recientes
router.get('/fecha/recientes', async (req, res) => {
    try {
        const postRecientes = await getPostByDate();
        res.json(postRecientes);
        //console.log(postRecientes);
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});




// Recupero total de post por CATEGORIAS
router.get('/count/:categorias', async (req, res) => {
    try {
        const categoria = req.params.categorias;
        //console.log(categoria);
        const cantidadPost = await countPost(categoria);
        res.json(cantidadPost)
    } catch (error) {
        res.json({ error: error.message })
    }
});

// Recupero Post por titulo
router.get('/titulo/:pId', async (req, res) => {
    try {
        const id = req.params.pId;
        const postTitulo = await getPostTitle(id);
        res.json(postTitulo);
    } catch (error) {
        res.json({ error: error.message })
    }

})





module.exports = router;