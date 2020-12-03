const router = require('express').Router();

const { getAllDog, getByIdDog, getByAgeDog, getBySizeDog, createDog, deleteByIdDog, updateByIdDog } = require('../../models/perro');
let perrosFiltradosEdad = [];
let perrosFiltradosEdadTamano = [];

//la petición general funciona bien
router.get('/', async (req, res) => {
    try {
        const rows = await getAllDog();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

//la petición por edad funciona bien
router.get('/:edad', async (req, res) => {
    try {
        perrosFiltradosEdad = await getByAgeDog(req.params.edad);
        res.json(perrosFiltradosEdad);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//la petición por edad y tamaño funciona bien (filtra por tamaño el array que devuelve los perros por edad)
router.get('/:edad/:tamano', async (req, res) => {
    try {
        const perrosFiltradosTamano = await getBySizeDog(req.params.tamano);
        for (let perroEdad of perrosFiltradosEdad) {
            for (let perroTamano of perrosFiltradosTamano) {
                if (perroEdad.nombre_perro == perroTamano.nombre_perro) {
                    perrosFiltradosEdadTamano.push(perroTamano);
                }
            }
        }
        res.json(perrosFiltradosEdadTamano);

    } catch (error) {
        res.json({ error: error.message });
    }
});


//crear un nuevo perro (funciona pero dice la consola algo de los headers)
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

//actualizar el perro funciona
router.put('/:idPerro', async (req, res) => {
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


//eliminar el perro funciona
router.delete('/:idPerro', async (req, res) => {
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