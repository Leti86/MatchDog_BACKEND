
//CUIDADO AQUI: LA BASE DE DATOS CREA CON OTROS DATOS, REVISAR (METE METROS Y TIPO ESPACIO EXTERIOR AUNQUE SON OPCIONALES: REVISAR, LOS HEMOS PUESTO COMO POSIBLES NULL EN MYSQL??)
const createAdoptante = ({ nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO protectora.adoptantes (nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    });
};


module.exports = {
    createAdoptante
};