const router = require('express').Router();
const { getAll, create, getById, getByNeedForVolunteers } = require('../../models/protectora');
const { getByIdDog } = require('../../models/perro');



// Recupero todas las protectoras
router.get('/', async (req, res) => {
    try {
        const rows = await getAll()
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Recupero los perros de cada protectora // ! Me devuellve array de perros vacio
router.get('/:IdProtectora/perros', async (req, res) => {
    try {
        const protectora = await getById(req.params.IdProtectora);
        const rows = await getByIdDog(req.params.idPerro);
        protectora.perros = rows;
        res.json(protectora);
    } catch (error) {
        res.json({
            error: error.message
        })
    }

});

// Recupero las protectoras segun la necesidad de voluntarios
router.get('/necesidad/:necesidad', async (req, res) => {
    try {
        const protectoras = await getByNeedForVolunteers(req.params.necesidad);
        res.json(protectoras);
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});

// Editamos una protectora 
router.get('/edita/:IdProtectora', async (req, res) => {
    const IdProtectora = req.params.IdProtectora;
    const protectora = await getById(IdProtectora);
    res.render('protectoras/formEdit', { protectora });
});

// TODO: me he quedado aqui. EN editar el formulario



// Creo una protectora // ! Faltan validaciones y comprobaciones
router.post('/', async (req, res) => {
    const result = await create(req.body);
    res.json(result);
});







module.exports = router;