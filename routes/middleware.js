const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getByIdAdopter } = require('../models/adoptante');
const { getById } = require('../models/protectora');

// const checkToken = async (req, res, next) => {

//     if (process.env.MIDDLEWARE_ACTIVE === 'OFF') {
//         return next();
//     }

//     if (!req.headers['authorization']) {
//         return res.status(403).json({ error: 'Necesitas la cabecera authorization' });
//     }

//     const token = req.headers['authorization'];
//     const obj = jwt.decode(token, process.env.SECRET_KEY);
//     if (!obj) {
//         return res.status(403).json({ error: 'El token es incorrecto' });
//     }
//     console.log(obj);
//     if (dayjs().unix() > obj.caducidad) {
//         return res.status(403).json({ error: 'El token ha caducado. pide otro' });
//     }

//     const adoptante = await getByIdAdopter(obj.adoptanteId);
//     console.log(adoptante);
//     const protectora = await getById(obj.protectoraId);
//     console.log(protectora);

//     if (!adoptante && !protectora) {
//         return res.status(403).json({ error: 'No existen ni ese adoptante ni esa protectora' })
//     }
//     if (!adoptante) {
//         req.user = protectora;
//     } else {
//         return res.status(403).json({ error: 'Acceso denegado. Solo las protectoras pueden acceder a esta funcionalidad.' })
//     }

//     next();
// }


const getToken = async (req, res, next) => {
    const token = req.headers.authorization;
    const obj = jwt.decode(token, process.env.SECRET_KEY);
    req.adoptanteId = obj.adoptanteId;
    next();
}

const getTokenProtectora = async (req, res, next) => {
    const token = req.headers.authorization;
    const obj = jwt.decode(token, process.env.SECRET_KEY);
    req.protectoraId = obj.protectoraId;
    next();
}

module.exports = {
    getToken, getTokenProtectora
}