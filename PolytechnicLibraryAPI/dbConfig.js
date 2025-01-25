const sql = require("mssql");

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: true, // Use this for Azure SQL
        trustServerCertificate: true, // For local development
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Connected to SQL Server");
        return pool;
    })
    .catch(err => console.log("Database Connection Failed: ", err));

module.exports = {
    sql,
    poolPromise,
};