var express = require('express');
const { getAllDog } = require('../models/perro');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//Renderización de vistas de PERROS:

//formulario de alta de nuevo perro
router.get('/alta', function (req, res, next) {
  res.render('formaltaperro', { title: 'alta' });
});

//formulario de edición de la info del perro
router.get('/editar', function (req, res, next) {
  res.render('formeditarperro', { title: 'editar' });
});

//lista completa de perros
router.get('/listaperros', async (req, res) => {
  try {
    const perros = await getAllDog();
    res.render('listaperros', {
      perros: perros
    });

  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
