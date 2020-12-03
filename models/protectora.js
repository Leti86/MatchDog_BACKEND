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

const create = ({ nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios }) => {
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


const getById = (pIdProtectora) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.lista_protectoras where id=?',
            [pIdProtectora],
            (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows[0]);
            }
        )
    });
};


const deleteById = (pIdProtectora) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.lista_protectoras',
            [pIdProtectora],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });
};

const updateById = (pIdProtectora, { nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE protectora.lista_protectoras SET nombre = ?, email = ?, telefono=?, direccion = ?, localidad = ?, provincia = ?, latitud = ?, longitud= ?, necesidad_voluntarios = ?, imagen= ?, comentarios= ? WHERE id = ?',
            [nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });


};


module.exports = {
    getAll, create, getById, deleteById, updateById
};