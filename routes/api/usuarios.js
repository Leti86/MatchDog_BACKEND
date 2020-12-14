// const router = require('express').Router();

// const bcrypt = require('bcryptjs'); // npm install bcryptjs
// const jwt = require('jsonwebtoken'); // npm install jsonwebtoken 
// const dayjs = require('dayjs'); // npm install dayjs


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log(req.body);

//     try {
//         const adoptante = await getByEmailAdopter(email);
//         console.log(password); //esta está llegando sin encriptar
//         console.log(adoptante.password); //esta está llegando encriptada. por eso cuando se comparan entra en el segundo if
//         if (!adoptante) {
//             return res.json({ error: 'Error en email y/o contraseña1' });
//         }
//         const iguales = bcrypt.compareSync(password, adoptante.password);
//         console.log(iguales);
//         if (!iguales) {
//             return res.json({ error: 'Error en email y/o contraseña2' });
//         }
//         res.json({
//             success: 'Login correcto',
//             token: createToken(adoptante)
//         })
//     } catch (error) {
//         res.json({ error: error.message });
//     }
// });

// //función de creación de token
// function createToken(pAdoptante) {
//     const obj = {
//         adoptanteId: pAdoptante.id,
//         caducidad: dayjs().add(10, 'minute').unix()
//     }
//     return jwt.sign(obj, process.env.SECRET_KEY);
// };

// module.exports = { createToken };