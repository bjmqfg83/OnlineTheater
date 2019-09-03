// 引入mysql module
const mysql  = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database: 'theatersql'
});
module.exports = pool;