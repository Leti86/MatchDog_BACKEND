const router = require('express').Router();
const { getAll, create, getById, getByNeedForVolunteers, getByDogProtectora, updateById, deleteById } = require('../../models/protectora');

// Recupero todas las protectoras
router.get('/', async (req, res) => {
    try {
        const rows = await getAll()
        res.render('protectoras/listadoProtectoras', { protectoras: rows });
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


// Recupero los perros de cada protectora // ! Me devuellve array con TODOS los perros
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

// PROPUESTA IRENE PARA RECUPERAR PERROS DE LA PROTECTORA: devuelve un array con los perros de la protectora cuyo ID le pases. No devuelve info de la protectora, solo los perros que le corresponden a esa protectora.
// router.get('/:IdProtectora/perros', async (req, res) => {
//     try {
//         const IdProtectora = req.params.IdProtectora;
//         const rows = await getByDogProtectora(IdProtectora);
//         res.json(rows);
//     } catch (error) {
//         res.json({
//             error: error.message
//         })
//     }
// });


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

// Editamos una protectora //! No me aperecen ni los comentarios ni la necesitadad. REVISAR!!!
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


// Modificamos datos de la protectrora //! no funciona cuando enviamos los datos
router.put('/update', async (req, res) => {
    try {
        const result = await updateById(req.body.IdProtectora, req.body);
        console.log(result);
        res.redirect('/api/protectoras/' + req.body.IdProtectora);
    } catch (error) {
        res.json({
            error: error.message
        })
    }

});





// Creo una protectora // ! Faltan validaciones y comprobaciones
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