const router = require('express').Router();
const bcrypt = require('bcryptjs'); //estamos requiriendo la librería que hemos instalado
const jwt = require('jsonwebtoken');
const { getToken } = require('../middleware');
const dayjs = require('dayjs');

const { createAdoptante, getAll, getByIdAdopter, getByEmailAdopter, updateById, deleteByIDAdopter, getFavouriteDogs, eliminarPerroListaFavoritos } = require('../../models/adoptante');



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

//recuperamos los datos de perfil del adoptante
router.get('/perfil', getToken, async (req, res) => {
    try {
        console.log(req.adoptanteId);
        const id = await getByIdAdopter(req.adoptanteId);
        res.json(id);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//recuperamos los perros favoritos del adoptante
router.get('/perrosfavoritos', getToken, async (req, res) => {
    try {
        const IdAdoptante = req.adoptanteId;
        const perrosFavoritos = await getFavouriteDogs(IdAdoptante);
        res.json(perrosFavoritos);

    } catch (error) {
        res.json({ error: error.message })
    }
})


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
router.get('/edita/', getToken, async (req, res) => {
    try {
        const IdAdoptante = req.adoptanteId;
        const adoptante = await getByIdAdopter(IdAdoptante);
        res.json(adoptante);
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

//Eliminamos perros de lista favoritos
router.get('/perrosfavoritos/borrar/:IdPerro', async (req, res) => {
    try {
        const IdPerro = req.params.IdPerro;
        const result = await eliminarPerroListaFavoritos(IdPerro);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Se ha borrado correctamente' });
        } else {
            res.json({ error: 'No se ha podido borrar' });
        }

    } catch (error) {
        res.json({ error: error.message })
    }
});


// Modificamos datos del adoptante
router.post('/update', getToken, async (req, res) => {
    try {
        console.log(req.body);
        const result = await updateById(req.adoptanteId, req.body);

        res.json(result)
    } catch (error) {
        res.json({ error: error.message });

    }

});


//A PARTIR DE AQUÍ: RUTAS Y MÉTODOS DEL LOGIN
// ruta para que el adoptante haga login y obtenga su token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const adoptante = await getByEmailAdopter(email);
        if (!adoptante) {
            return res.json({ error: 'Error en email y/o contraseña1' });
        }
        const iguales = bcrypt.compareSync(password, adoptante.password);
        console.log(iguales);


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