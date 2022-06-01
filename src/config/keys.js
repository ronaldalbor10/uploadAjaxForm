
module.exports = {

    database: {
        connectionLimit: 10,
        connectTimeout  : 60 * 60 * 1000,
        acquireTimeout  : 60 * 60 * 1000,
        timeout         : 60 * 60 * 1000,
        port:3306,
        host: 'localhost',
        user: 'debtest2', 
        password: 'Racmaster801209',
        database: 'systransport',
        //multipleStatements: true
      
    }
}