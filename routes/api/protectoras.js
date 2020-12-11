const router = require('express').Router();
const { getAll, create, getById, getByNeedForVolunteers, getByDogProtectora, updateById, deleteById, getCoord } = require('../../models/protectora');

// Recupero todas las protectoras
router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

// Recupero datos por ID protectora
router.get('/:IdProtectora', async (req, res) => {
    try {
        const IdProtectora = req.params.IdProtectora;
        const protectora = await getById(IdProtectora);
        res.render('protectoras/detalleProtectora', { protectora });
    } catch (error) {
        res.json({
            error: error.message
        })
    }

});


// Recupero los perros de cada protectora 
router.get('/:IdProtectora/perros', async (req, res) => {
    try {
        const protectora = await getById(req.params.IdProtectora);
        const rows = await getByDogProtectora(req.params.IdProtectora);
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

//Recupero la longitud y latitud de todas las protectoras (para imprimir los markers en el mapa) FUNCIONA, NO TOCAR
router.get('/coordenadas/coordenadas', async (req, res) => {
    try {
        const coordenadas = await getCoord();
        res.json(coordenadas);
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});


// Editamos una protectora 
router.get('/edita/:IdProtectora', async (req, res) => {
    try {
        const IdProtectora = req.params.IdProtectora;
        const protectora = await getById(IdProtectora);
        res.render('protectoras/formEdit', { protectora });
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});

// Eliminamos protectora
router.get('/borrar/:IdProtectora', async (req, res) => {
    try {
        const IdProtectora = req.params.IdProtectora;
        const result = await deleteById(IdProtectora);
        console.log(result);
        res.redirect('/api/protectoras');
    } catch (error) {
        res.json({
            error: error.message
        })
    }

});


// Modificamos datos de la protectrora
router.post('/update', async (req, res) => {
    try {
        //console.log(req.body);
        const result = await updateById(req.body.IdProtectora, req.body);
        console.log(result);
        res.redirect('/api/protectoras/' + req.body.IdProtectora);
    } catch (error) {
        res.json({
            error: error.message
        })
    }

});





// Creo una protectora 
router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        res.json(result);
    } catch (error) {
        res.json({
            error: error.message
        })
    }
});







module.exports = router;