const router = require('express').Router();

const { createAdoptante } = require('../../models/adoptante');

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
})


module.exports = router;