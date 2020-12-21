const router = require('express').Router();
const { getToken } = require('../middleware');

const { getAllDog, getByIdDog, getByAgeDog, getBySizeDog, createDog, deleteByIdDog, updateByIdDog, getByAgeAndSizeDog, addDogsFavorites } = require('../../models/perro');



//Obtenemos todos los perros
router.get('/', async (req, res) => {
    try {
        const rows = await getAllDog();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});


//Obtenemos la info de un perro (por ID del perro)
router.get('/:idPerro', async (req, res) => {
    try {
        const idPerro = req.params.idPerro;
        const perro = await getByIdDog(idPerro);
        res.json(perro);
    } catch (error) {
        res.json({ error: error.message })
    }
})




//Obtenemos un perro por edad (cachorro/adulto) Primer filtro
router.get('/edad/:edad', async (req, res) => {
    try {
        const perrosFiltradosEdad = await getByAgeDog(req.params.edad);
        res.json(perrosFiltradosEdad);
    } catch (error) {
        res.json({ error: error.message });
    }
});


//Obtenemos un perro por tamaño (pequeño/mediano/grande) Segundo filtro
router.get('/tamano/:tamano', async (req, res) => {
    const perrosFiltradosTamano = await getBySizeDog(req.params.tamano);
    res.json(perrosFiltradosTamano);
});




//Obtenemos un perro por edad y tamaño. Tercer filtro
router.get('/:edad/:tamano', async (req, res) => {
    try {
        const perrosFiltro = await getByAgeAndSizeDog(req.params.edad, req.params.tamano);
        res.json(perrosFiltro);
    } catch (error) {
        res.json({ error: error.mensaje });
    }
});



//Creamos un nuevo perro
router.post('/crear', [
], async (req, res) => {
    try {
        const result = await createDog(req.body);
        if (result.affectedRows === 1) {
            res.json({ message: 'El perro se ha insertado correctamente.' });

        } else {
            res.json({ error: 'No se ha insertado. Error.' });
        }
        res.json(result);

    } catch (error) {
        res.json({ error: error.message })
    }

});

// Añadimos un nuvo perro a la lista favoritos
router.get('/add/favoritos/:IdPerro', getToken, async (req, res) => {
    try {
        const id_perro = req.params.IdPerro;
        const id_adoptante = req.adoptanteId;
        const perroFavorito = await addDogsFavorites(id_perro, id_adoptante);
        res.json(perroFavorito);
    } catch (error) {
        res.json({ error: error.message })
    }
});





//Editamos un perro
router.put('/editar/:idPerro', async (req, res) => {
    try {
        const result = await updateByIdDog(req.params.idPerro, req.body);
        if (result.affectedRows === 1) {
            const perroActualizado = await getByIdDog(req.params.idPerro);
            res.json(perroActualizado);
        } else {
            res.json({ error: 'No se ha podido actualizar' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});



//Eliminamos un perro
router.delete('/borrar/:idPerro', async (req, res) => {
    try {
        const result = await deleteByIdDog(req.params.idPerro);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Se ha borrado correctamente' });
        } else {
            res.json({ error: 'No se ha podido borrar' });
        }
    } catch (error) {
        res.json({ error: error.message })
    }

});




module.exports = router;