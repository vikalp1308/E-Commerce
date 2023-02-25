const dbCredentials = () => {
    return {
        connectionLimit: 1,
        host: "127.0.0.1",
        user: "root",
        password: "password",
        port: "3306",
        database: "Ecommerce",
        debug: false
    }
}

module.exports = {
    dbCredentials :dbCredentials()
}