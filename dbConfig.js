const mysql = require('mysql');

require('dotenv').config();

const createPool = () => {
    const pool = mysql.createPool({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        port: process.env.db_port,
        database: process.env.db_name
    });
    global.db = pool;
}

module.exports = {
    createPool
}