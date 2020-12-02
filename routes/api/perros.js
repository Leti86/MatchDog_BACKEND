const router = require('express').Router();

const { getAll, getByAge, getBySize } = require('../../models/perro');
let perrosFiltradosEdad = [];
let perrosFiltradosEdadTamano = [];

//la petición general funciona bien
router.get('/', async (req, res) => {
    try {
        const rows = await getAll();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

//la petición por edad funciona bien
router.get('/:edad', async (req, res) => {
    try {
        perrosFiltradosEdad = await getByAge(req.params.edad);
        res.json(perrosFiltradosEdad);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//la petición por edad y tamaño funciona bien (filtra por tamaño el array que devuelve los perros por edad)
router.get('/:edad/:tamano', async (req, res) => {
    try {
        const perrosFiltradosTamano = await getBySize(req.params.tamano);
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




module.exports = router;