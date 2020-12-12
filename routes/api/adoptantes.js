const router = require('express').Router();
const bcrypt = require('bcryptjs'); //estamos requiriendo la librería que hemos instalado
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { createAdoptante, getAll, getByIdAdopter, getByEmailAdopter, updateById, deleteByIDAdopter } = require('../../models/adoptante');



//Crea un nuevo adoptante en la base de datos. FUNCIONA BIEN. ENCRIPTACIÓN DE CONTRASEÑA INCLUIDA
router.post('/crear', [
    //sin validadores
], async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
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


//A PARTIR DE AQUÍ: RUTAS Y MÉTODOS DEL LOGIN
//ruta para que el adoptante haga login y obtenga su token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const adoptante = await getByEmailAdopter(email);
        console.log(password); //esta está llegando sin encriptar
        console.log(adoptante.password); //esta está llegando encriptada. por eso cuando se comparan entra en el segundo if
        if (!adoptante) {
            return res.json({ error: 'Error en email y/o contraseña1' });
        }
        const iguales = bcrypt.compareSync(password, adoptante.password);
        if (!iguales) {
            return res.json({ error: 'Error en email y/o contraseña2' });
        }
        res.json({
            success: 'Login correcto',
            token: createToken(adoptante)
        })
    } catch (error) {
        res.json({ error: error.message });
    }
});

//función de creación de token
function createToken(pAdoptante) {
    const obj = {
        adoptanteId: pAdoptante.id,
        caducidad: dayjs().add(10, 'minute').unix()
    }
    return jwt.sign(obj, process.env.SECRET_KEY);
};

module.exports = router;