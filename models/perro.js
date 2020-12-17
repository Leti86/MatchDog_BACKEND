//obtiene a todos los perros con su protectora, ciudad y provincia
//ATENCIÓN: HE MODIFICADO LAS QUERYS DE GET DOGS PARA RECUPERAR P.IMAGEN, SI NO NO SE PUEDEN IMPRIMIR EN EL FRONT LAS IMÁGENES DE LOS PERROS
//ATENCIÓN: HE VUELTO A MODIFICAR LAS QUERYS GETALLDOG PARA RECUPERAR P.ID, SI NO NO FUNCIONA EN EL BACK LOS BOTONES DE  LA LISTA DE PERROS EN LA VISTA DE PUG DE LISTAPERROS
const getAllDog = () => {
    return new Promise((resolve, reject) => {
        db.query('select p.id, p.nombre_perro, p.raza, p.edad_numero, p.sexo, p.imagen, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

//obtiene un perro por ID
const getByIdDog = (perroId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from protectora.perros as p where p.id=?', [perroId], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};





//primer filtro: obtiene los perros por edad: adulto o cachorro
const getByAgeDog = (edadPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, p.imagen, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and edad=?', [edadPerro], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};


//segundo filtro, depende del primero: obtiene los perros por tamaño: pequeño, mediano, grande
const getBySizeDog = (tamanoPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, p.imagen, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and tamano=?', [tamanoPerro], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};

const getByAgeAndSizeDog = (edadPerro, tamanoPerro) => {
    return new Promise((resolve, reject) => {
        db.query('select p.nombre_perro, p.raza, p.edad_numero, p.sexo, p.imagen, lp.nombre, lp.provincia, lp.localidad from protectora.perros as p, protectora.lista_protectoras as lp where p.fk_protectora = lp.id and edad=? and tamano=?',
            [edadPerro, tamanoPerro],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }

        )
    });



};

//para crear un nuevo perro
const createDog = ({ raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO protectora.perros (raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora) values(?,?,?,?,?,?,?,?,?,?,?,?)', [raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora], (error, result) => {
            if (error) reject(error);
            resolve(result);
        })
    });
};


// añadir perros en la tabla favoritos
const addDogsFavorites = ({ id_perro, id_adoptante }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'insert into protectora.favoritos (id_perro, id_adoptante) values (?, ?)',
            [id_perro, id_adoptante],
            (error, result) => {
                if (error) reject(error);
                resolve(result);
            }
        )
    });


};



//actualizar por id funciona??
const updateByIdDog = (idPerro, { raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora }) => {
    return new Promise((resolve, reject) => {
        db.query('update perros set raza=?, edad=?, tamano=?, edad_numero=?, sexo=?, apto_gatos=?, leishmania=?, localizacion=?, descripcion=?, imagen=?, nombre_perro=?, fk_protectora=? where id=?', [raza, edad, tamano, edad_numero, sexo, apto_gatos, leishmania, localizacion, descripcion, imagen, nombre_perro, fk_protectora, idPerro], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    })
};

//eliminar por id funciona
const deleteByIdDog = (idPerro) => {
    return new Promise((resolve, reject) => {
        db.query('delete from perros where id = ?', [idPerro], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};




module.exports = {
    getAllDog, getByIdDog, getByAgeDog, getBySizeDog, createDog, deleteByIdDog, updateByIdDog, getByAgeAndSizeDog, addDogsFavorites
}

