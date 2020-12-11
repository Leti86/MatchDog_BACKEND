
// Seleccionamos todos los post
const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.posts',
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
};

// Filtro por categoria
const getByCategory = (pCategory) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM protectora.posts where categoria=?',
            [pCategory],
            (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            }
        )
    });
};


// Recupero los post mas recientes
const getPostByDate = () => {
    return new Promise((resolve, reject) => {
        db.query('select posts.* from protectora.posts where fecha >= "2020-09-10"',

            (error, rows) => {
                if (error) reject(error);
                resolve(rows);

            }
        )
    });

};

// Recupero total de post por categoria
const countPost = (pCategoria) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select count(id) as "numPost" from protectora.posts where categoria = ?',
            [pCategoria],
            (error, result) => {
                if (error) reject(error);
                resolve(result[0]);
            }
        )
    });
};


// Recupero Post por titulos
const getPostTitle = (pId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'select * from protectora.posts where posts.id = ?',
            [pId],
            (error, rows) => {

                if (error) reject(error);
                resolve(rows)
            }

        )
    });
}


module.exports = {
    getAllPosts, getByCategory, getPostByDate, countPost, getPostTitle
};