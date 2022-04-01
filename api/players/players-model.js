const db = require('../../data/dbConfig')


function getAll() {
    return db('players')
  }
  
function getById(id) {
  return db('players').where('id', id).first();
}

async function insert(player) {
  const [id] = await db('players').insert(player);
  return getById(id);
}

async function update(id, changes) {
  await db('players')
    .update({ name: changes.name })
    .where('id', id); 
  return getById(id);
}

async function remove(id) {
  const result = await getById(id);
  await db('players')
    .where('id', id)
    .del();
  
  return result;
} 

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}