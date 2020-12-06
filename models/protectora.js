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


// Creamos una nueva protectora
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

// Filtramos por ID de protectora
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


// Perros de cada protectora
const getByDogProtectora = (pIdProtectora) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select lp.*, p.* from protectora.lista_protectoras as lp, protectora.perros as p where p.fk_protectora = lp.id',
            [pIdProtectora],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
}



// Filtramos por la necesidad de voluntarios de una protectora
const getByNeedForVolunteers = (pNecesidadVoluntarios) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select lp.nombre, lp.email, lp.telefono, lp.direccion, lp.localidad, lp.provincia from protectora.lista_protectoras as lp where necesidad_voluntarios = ?',
            [pNecesidadVoluntarios],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }

        )
    });
};

// Eliminamos protectoras
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


// Modificamos datos de una protectora
const updateById = (pIdProtectora, { nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE protectora.lista_protectoras SET nombre = ?, email = ?, telefono=?, direccion = ?, localidad = ?, provincia = ?, latitud = ?, longitud= ?, necesidad_voluntarios = ?, imagen= ?, comentarios= ? WHERE id = ?',
            [nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, pIdProtectora],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });


};


module.exports = {
    getAll, create, getById, deleteById, updateById, getByNeedForVolunteers, getByDogProtectora
};