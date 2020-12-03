const router = require('express').Router();
const { getAll, create } = require('../../models/protectora');



// Recupero todas las protectoras
router.get('/', async (req, res) => {
    try {
        const rows = await getAll()
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
});



// Creo una protectora // ! Faltan validaciones y comprobaciones

router.post('/', async (req, res) => {
    const result = await create(req.body);
    res.json(result);
});


module.exports = router;