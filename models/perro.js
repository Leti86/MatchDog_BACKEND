//obtiene a todos los perros con su protectora, ciudad y provincia
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

//obtiene un perro por ID
const getById = (perroId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from protectora.perros as p where p.id=?', [perroId], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};



//primer filtro: obtiene los perros por edad: adulto o cachorro
const getByAge = (edadPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and edad=?', [edadPerro], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};


//segundo filtro, depende del primero: obtiene los perros por tamaño: pequeño, mediano, grande
const getBySize = (tamanoPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and tamano=?', [tamanoPerro], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

//para crear un nuevo perro
const create = ({ raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO protectora.perros (raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora) values(?,?,?,?,?,?,?,?,?,?,?,?)', [raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    });
};



//actualizar por id no funciona
const updateById = (idPerro, { raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query('update perros set raza=?, edad=?, tamano=?, edad_numero=?, sexo=?, apto_gatos=?, leishmania=?, localizacion=?, descripcion=?, imagen=?, nombre_perro=?, fk_protectora=? where id=?', [raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora, idPerro], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    })
};

//eliminar por id funciona
const deleteById = (idPerro) => {
    return new Promise((resolve, reject) => {
        db.query('delete from perros where id = ?', [idPerro], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};




module.exports = {
    getAll, getById, getByAge, getBySize, create, deleteById, updateById
}

