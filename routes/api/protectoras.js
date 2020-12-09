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

// Editamos una protectora //! Problema, no me aperecen ni los comentarios ni la necesitadad. REVISAR!!!
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





// Creo una protectora // ! Revisar validaciones
router.post('/', /* [
    //Comporbamos datos de entrada
    body('nombre', 'El campo nombre debe tener valor').exists().not().isEmpty(),
    body('email').isEmail(),
    body('telefono', 'El campo telefono debe un minimo de 9 digitos').exists().not().isEmpty(),
    body('direccion', 'El campo dirección debe tener valor').exists().not().isEmpty(),
    body('localidad', 'El campo locallidad debe tener valor').exists().not().isEmpty(),
    body('localidad', 'El campo locallidad debe tener valor').exists().not().isEmpty(),
    body('provincia', 'El campo provincia debe tener valor').exists().not().isEmpty(),
    body('latitud', 'El campo latitud debe tener valor').exists().not().isEmpty(),
    body('longitud', 'El campo longitud debe tener valor').exists().not().isEmpty(),
    body('necesidad_voluntarios', 'Debes introducir un valor').exists().not().isEmpty(),
    body('imagen', 'Introduce una imagen por por favor').exists().not().isEmpty(),
    body('comentarios', 'Haznos una breve descripcion').exists().not().isEmpty()
], */ async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const result = await create(req.body);
            res.json(result);
        } catch (error) {
            res.json({
                error: error.message
            })
        }
    });







module.exports = router;