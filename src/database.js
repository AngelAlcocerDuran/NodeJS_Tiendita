const mysql = require('mysql');
const {promisify} = require('util'); //Soporte para callbacks, promises, async y await
const {database} = require('./keys.js');
const router = require('./routes/index.js');

const pool = mysql.createPool(database);

pool.getConnection((err, conn) => {
    if(err){
        if(err.code === 'PROTOCOL_CENNETCTION_LOST'){
            console.log('DATABASE_CLOSED');

        }else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('ALL_CONNECTIONS_USED');

        }else if(err.code === 'ECONNREFUSED'){
            console.log("CONECCTION_REFUSED");

        }
    }

    if(conn) conn.release();
    console.log("DATABASE_CONNECTED");
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;