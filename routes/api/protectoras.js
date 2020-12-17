const router = require('express').Router();
const bcrypt = require('bcryptjs'); //estamos requiriendo la librería que hemos instalado
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getTokenProtectora } = require('../middleware');

const { getAll, create, getById, getByEmailProtectora, getByNeedForVolunteers, getByDogProtectora, updateById, deleteById, getCoord } = require('../../models/protectora');

// Recupero todas las protectoras
router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

//recuperamos el perfil de la protectora (para vistaprotectora en el front)
router.get('/perfil', getTokenProtectora, async (req, res) => {
    console.log(req.protectoraId);
    try {
        console.log(req.protectoraId);
        const id = await getById(req.protectoraId);
        res.json(id);
    } catch (error) {
        res.json({ error: error.message })
    }
})

// Recupero datos por ID protectora
router.get('/:IdProtectora', async (req, res) => {
    try {
        const IdProtectora = req.params.IdProtectora;
        const protectora = await getById(IdProtectora);
        res.json(protectora);
    } catch (error) {
        res.json({ error: error.message })
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
        req.body.password_protectora = bcrypt.hashSync(req.body.password_protectora, 10);
        const result = await create(req.body);
        if (result.affectedRows === 1) {
            res.json({ message: 'La protectora se ha incluido en la base de datos.' });
        } else {
            res.json({ error: 'No se ha podido insertar la protectora.' })
        }

    } catch (error) {
        res.json({
            error: error.message
        })
    }
});


//A PARTIR DE AQUÍ: RUTAS Y MÉTODOS DEL LOGIN
// ruta para que la protectora haga login y obtenga su token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const protectora = await getByEmailProtectora(email);
        if (!protectora) {
            return res.json({ error: 'Error en email y/o contraseña1' });
        }
        const iguales = bcrypt.compareSync(password, protectora.password_protectora);
        console.log(iguales);


        if (!iguales) {
            return res.json({ error: 'Error en email y/o contraseña2' });
        }
        res.json({
            success: 'Login correcto',
            token: createToken(protectora)
        })

    } catch (error) {
        res.json({ error: error.message });
    }
});



//función de creación de token
function createToken(pProtectora) {
    const obj = {
        protectoraId: pProtectora.id,
        caducidad: dayjs().add(10, 'minute').unix()
    }
    return jwt.sign(obj, process.env.SECRET_KEY);
};







module.exports = router;