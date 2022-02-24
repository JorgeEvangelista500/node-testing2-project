const db = require('../../data/dbConfig')


function getAll() {
    return db('players')
  }

module.exports = {
    getAll,
}