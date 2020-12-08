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

//GET: PETICIÓN DE UN SOLO PERRO. RENDERIZA LA VISTA VISTAPERRO.!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//PROBLEMA: RENDERIZA LA VISTA PERO NO ME IMPRIME LA INFO DEL PERRO
router.get('/:idPerro', async (req, res) => {
    try {
        const idPerro = req.params.idPerro;
        const perro = await getByIdDog(idPerro);
        // res.json(perro)
        res.render('perros/vistaperro', { perro });
    } catch (error) {
        res.json({ error: error.message })
    }
})




//GET: PETICIÓN POR EDAD (CACHORRO/ADULTO) FUNCIONA BIEN
router.get('/edad/:edad', async (req, res) => {
    try {
        const perrosFiltradosEdad = await getByAgeDog(req.params.edad);
        res.json(perrosFiltradosEdad);
    } catch (error) {
        res.json({ error: error.message });
    }
});


//GET: PETICIÓN POR TAMAÑO (PEQUENO, MEDIANO, GRANDE) FUNCIONA BIEN
router.get('/tamano/:tamano', async (req, res) => {
    const perrosFiltradosTamano = await getBySizeDog(req.params.tamano);
    res.json(perrosFiltradosTamano);
});




//GET: PETICIÓN POR EDAD Y TAMAÑO COMBINADOS FUNCIONA BIEN
router.get('/:edad/:tamano', async (req, res) => {
    try {
        const perrosFiltro = await getByAgeAndSizeDog(req.params.edad, req.params.tamano);
        res.json(perrosFiltro);
    } catch (error) {
        res.json({ error: error.mensaje });
    }
});



//POST: CREAR UN NUEVO PERRO. FUNCIONA CORRECTAMENTE
router.post('/crear', [
    //sin validadores
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



//PUT: EDITAR PERRO. FUNCIONA CORRECTAMENTE
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



//DELETE: ELIMINA EL PERRO. FUNCIONA CORRECTAMENTE
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