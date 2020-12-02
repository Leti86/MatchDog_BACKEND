// Mostramos la protectotas
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from protectora.lista_protectoras',
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            });
    });
};

const create = ({ id, nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO protectora.lista_protectoras (nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }

        )
    })

}


module.exports = {
    getAll, create
};