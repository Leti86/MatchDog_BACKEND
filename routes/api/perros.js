const router = require('express').Router();

const { getAllDog, getByIdDog, getByAgeDog, getBySizeDog, createDog, deleteByIdDog, updateByIdDog, getByAgeAndSizeDog } = require('../../models/perro');



//PETICIÓN DE TODOS LOS PERROS. RENDERIZA LA VISTA LISTAPERROS. FUNCIONA BIEN
router.get('/', async (req, res) => {
    try {
        const rows = await getAllDog();
        res.render('perros/listaperros', {
            perros: rows
        });

    } catch (error) {
        res.json({ error: error.message });
    }
});

//PETICIÓN DE UN SOLO PERRO. RENDERIZA LA VISTA VISTAPERRO. RENDERIZA LA VISTA PERO DICE QUE NO EXISTE NINGUN PERRO
router.get('/:idPerro', async (req, res) => {
    try {
        const idPerro = req.params.idPerro;
        const rows = await getByIdDog(idPerro);
        res.render('perros/vistaperro', { rows });

    } catch (error) {
        res.json({ error: error.message })
    }
})



//NUEVO PERRO. RENDERIZA FORMULARIO FORMALTAPERRO NO FUNCIONA
router.get('/nuevoperro', async (req, res) => {
    try {
        res.render('/perros/formaltaperro');
    } catch (error) {
        res.json({ error: error.message });
    }
});

//EDITAR PERRO. REDERIZA FORMULARIO FORMEDITARPERRO NO FUNCIONA
router.put('/editar/:idPerro', async (req, res) => {
    try {
        const result = await updateByIdDog(req.params.idPerro, req.body);
        if (result.affectedRows === 1) {
            const idPerroActualizado = await getByIdDog(req.params.idPerro);
            res.render('perros/formeditarperro', { idPerroActualizado });
        } else {
            res.json({ error: 'No se ha podido actualizar' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});






//la petición por edad funciona bien
router.get('/edad/:edad', async (req, res) => {
    try {
        const perrosFiltradosEdad = await getByAgeDog(req.params.edad);
        res.json(perrosFiltradosEdad);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Filtro por tamaño
router.get('/tamano/:tamano', async (req, res) => {
    const perrosFiltradosTamano = await getBySizeDog(req.params.tamano);
    res.json(perrosFiltradosTamano);
});




//la petición por edad y tamaño funciona bien (filtra por tamaño el array que devuelve los perros por edad)
router.get('/:edad/:tamano', async (req, res) => {
    try {
        const perrosFiltro = await getByAgeAndSizeDog(req.params.edad, req.params.tamano);
        res.json(perrosFiltro);
    } catch (error) {
        res.json({ error: error.mensaje });
    }
});



//crear un nuevo perro
router.post('/crear', [
    //sin validadores
], async (req, res) => {

    const result = await createDog(req.body);
    if (result.affectedRows === 1) {
        res.json({ message: 'El perro se ha insertado correctamente.' });

    } else {
        res.json({ error: 'No se ha insertado. Error.' });
    }
    res.json(result);
});







//eliminar el perro funciona
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