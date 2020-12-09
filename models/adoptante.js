
//CUIDADO AQUI: LA BASE DE DATOS CREA CON OTROS DATOS, REVISAR (METE METROS Y TIPO ESPACIO EXTERIOR AUNQUE SON OPCIONALES: REVISAR, LOS HEMOS PUESTO COMO POSIBLES NULL EN MYSQL??)
const createAdoptante = ({ nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO protectora.adoptantes (nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa], (error, result) => {
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

// Modificamos datos de una adoptante
const updateById = (pIdAdoptante, { nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE protectora.adoptantes SET nombre = ?, apellidos = ?, direccion=?, email = ?, telefono = ?, localidad = ?, provincia = ?, tiene_gato= ?, espacio_exterior = ?, metros_exterior= ?, tipo_vivienda= ?, tipo_espacio_exterior=?, fotos_casa=? WHERE id = ?',
            [nombre, apellidos, direccion, email, telefono, localidad, provincia, tiene_gato, espacio_exterior, metros_exterior, tipo_vivienda, tipo_espacio_exterior, fotos_casa, pIdAdoptante],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });
};




module.exports = {
    createAdoptante, getAll, getByIdAdopter, deleteByIDAdopter, updateById
};