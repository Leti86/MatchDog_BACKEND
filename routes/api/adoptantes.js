const router = require('express').Router();

const { createAdoptante, getAll, getByIdAdopter, updateById, deleteByIDAdopter } = require('../../models/adoptante');

//Crea un nuevo adoptante en la base de datos. FUNCIONA BIEN
router.post('/crear', [
    //sin validadores
], async (req, res) => {
    try {
        const result = await createAdoptante(req.body);
        if (result.affectedRows === 1) {
            res.json({ message: 'El adoptante se ha incluido en la base de datos.' });
        } else {
            res.json({ error: 'No se ha podido insertar el adoptante.' })
        }
        res.json(result);

    } catch (error) {
        res.json({ error: error.message })
    }
});

// Recupero todos los adoptantes
router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
});

// Recupero datos por Id adoptante
router.get('/:IdAdoptante', async (req, res) => {
    try {
        const IdAdoptante = req.params.IdAdoptante;
        const adoptante = await getByIdAdopter(IdAdoptante);
        res.json(adoptante);
    } catch (error) {
        res.json({ error: error.message })
    }
});

// Editamos un adoptante
router.get('/edita/:IdAdoptante', async (req, res) => {
    try {
        const IdAdoptante = req.params.IdAdoptante;
        const adoptante = await getByIdAdopter(IdAdoptante);
        res.render('adoptantes/formEdit', { adoptante });
    } catch (error) {
        res.json({ error: error.message })
    }
});


// Eliminamos adoptante
router.get('/borrar/:IdAdoptante', async (req, res) => {
    try {
        const IdAdoptante = req.params.IdAdoptante;
        const result = await deleteByIDAdopter(IdAdoptante);
        console.log(result);
        res.redirect('/api/adoptantes');
    } catch (error) {
        res.json({ error: error.message })
    }

});


// Modificamos datos del adoptante
router.post('/update', async (req, res) => {
    try {
        //console.log(req.body);
        const result = await updateById(req.body.IdAdoptante, req.body);
        console.log(result);
        res.redirect('/api/adoptantes');
    } catch (error) {
        res.json({ error: error.message })
    }

});


module.exports = router;