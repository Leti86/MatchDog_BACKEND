
//creamos un adoptante
const createAdoptante = ({ nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO protectora.adoptantes (nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, password, rol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, password, 'ADOPTANTE'], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    });
};


// Mostrar todos los adoptantes
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.adoptantes',
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
};


// Filtar por ID de adoptante
const getByIdAdopter = (pIdAdoptante) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.adoptantes where id=?',
            [pIdAdoptante],
            (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows[0]);
            }
        )
    });
};

// Botones para lista favoritos
/* const getByPage = (numPagina) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.posts LIMIT 3 OFFSET ?',
            [(numPagina - 1) * 3],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
} */



//obtener el adoptante por su email de registro
const getByEmailAdopter = (pEmailAdoptante) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.adoptantes where email=?',
            [pEmailAdoptante],
            (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows[0]);
            }
        )
    });
};

//recuperamos los perros favoritos de cada adoptante
const getFavouriteDogs = (pIdAdoptante) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT p.id, p.nombre_perro, p.edad, p.tamano, p.imagen, f.id as idFavorito FROM protectora.favoritos as f INNER JOIN protectora.perros AS p ON p.id=f.id_perro INNER JOIN protectora.adoptantes AS a ON a.id=f.id_adoptante WHERE f.id_adoptante=?',
            [pIdAdoptante],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
};






// Eliminamos adoptante
const deleteByIDAdopter = (pIdAdoptante) => {
    return new Promise((resolve, reject) => {
        db.query(
            'delete from adoptantes where id = ?',
            [pIdAdoptante],
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            }

        )
    });
};

// Modificamos datos de un adoptante
const updateById = (pIdAdoptante, { nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, password }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE protectora.adoptantes SET nombre = ?, apellidos = ?, direccion=?, email = ?, telefono = ?, localidad = ?, provincia = ?, tiene_gato= ?, espacio_exterior = ?, metros_exterior= ?, tipo_vivienda= ?, tipo_espacio_exterior=?, fotos_casa=?, password=?, rol=?  WHERE id = ?',
            [nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, password, 'ADOPTANTE', pIdAdoptante],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });
};

// Eliminar perros de la lista de favoritos
const eliminarPerroListaFavoritos = (pIdFavoritos) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM protectora.favoritos WHERE favoritos.id=?',
            [pIdFavoritos],
            (error, result) => {
                if (error) reject(error);
                resolve(result)

            }
        )
    });

};






module.exports = {
    createAdoptante, getAll, getByIdAdopter, getByEmailAdopter, getFavouriteDogs, deleteByIDAdopter, updateById, eliminarPerroListaFavoritos
};