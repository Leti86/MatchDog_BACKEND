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
const create = ({ nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, password_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO protectora.lista_protectoras (nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, password_protectora) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
            [nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, password_protectora],
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

//Filtramos por mail de la protectora
const getByEmailProtectora = (pEmailProtectora) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.lista_protectoras where email=?',
            [pEmailProtectora],
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
            'select p.* from protectora.lista_protectoras as lp, protectora.perros as p where p.fk_protectora = lp.id and lp.id=?',
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

//Obtenemos la longitud y la latitud de cada protectora (para imprimir los markers en el mapa del front)
const getCoord = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT lp.latitud, lp.longitud, lp.nombre, lp.localidad, lp.id FROM protectora.lista_protectoras as lp',
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
};


//Consulta para tabla vistaprotectora: obtiene nombre perro y datos adoptante de cada protectora
const getTableData = (pIdProtectora) => {
    return new Promise((resolve, reject) => {
        db.query(
            "select f.id as 'id_tabla_favorito', p.id as 'id_del_perro', p.nombre_perro, a.nombre as 'nombre_adoptante', a.telefono, a.localidad, a.email, a.id as 'id_adoptante', (select count(id_perro) from  favoritos where id_perro =f.id_perro) as 'adoptantes_interesados' from protectora.favoritos as f inner join protectora.perros as p on p.id = f.id_perro inner join protectora.adoptantes as a on a.id = f.id_adoptante where p.fk_protectora = ?",
            [pIdProtectora],
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
            'delete from lista_protectoras where id = ?',
            [pIdProtectora],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });
};

// Eliminamos perro_adoptante de la tabla favoritos
const deleteByFavoriteRelation = (pIdFavorito) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM protectora.favoritos WHERE favoritos.id= ?',
            [pIdFavorito],
            (error, result) => {
                if (error) reject(error);
                resolve(result)
            }
        )
    });
};


// Modificamos datos de una protectora
const updateById = (pIdProtectora, { nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, password_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE protectora.lista_protectoras SET nombre = ?, email = ?, telefono=?, direccion = ?, localidad = ?, provincia = ?, latitud = ?, longitud= ?, necesidad_voluntarios = ?, imagen= ?, comentarios= ?, password_protectora= ? WHERE id = ?',
            [nombre, email, telefono, direccion, localidad, provincia, latitud, longitud, necesidad_voluntarios, imagen, comentarios, password_protectora, pIdProtectora],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });


};


module.exports = {
    getAll, create, getById, getByEmailProtectora, deleteById, updateById, getByNeedForVolunteers, getByDogProtectora, getCoord, getTableData, deleteByFavoriteRelation
};