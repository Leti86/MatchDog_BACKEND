//obtiene a todos los perros con su protectora, ciudad y provincia
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id', (error, rows) => {
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


//segundo filtro: obtiene los perros por tamaño: pequeño, mediano, grande
const getBySize = (tamanoPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and tamano=?', [tamanoPerro], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

module.exports = {
    getAll, getByAge, getBySize
}

