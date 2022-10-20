const database = require('../src/database/connect')
//


// database.query(`insert into users(username, password) values ('admin4', '123123')`)
//     .then((result) => {
//         console.log(result.rows)
//         database.end()
//     })
// database.query(`delete from product returning *`)
//     .then((result) => {
//         console.log(result.rows)
//     })

// database.query(`delete from category returning *`)
//     .then((result) => {
//         console.log(result.rows)
//     })
// database.query('delete from supplier returning *')
//     .then((result) => {
//         console.log(result.rows)
//     })

database.query('select * from users')
    .then((result) => {
        console.log(result.rows)
    })
database.end()