const knex = require('knex');
const knexConfig = require('../knexfile');

const deebee = knex(knexConfig.development);

module.exports = {
    add,
    putStuff,
    getStuff,
    getBy,
    getById,
};

function getStuff() {
    return deebee('users').select('id','name','password');
}

function getBy(thing) {
    return deebee('users').where(thing);
}

function getById(stuff) {
    return deebee('users').where({id: stuff}).first();
}

function putStuff(item) {
    deebee('users').insert(item)
    .then(yay => {
        setTimeout( function() {
        return (item);
        }, 2500);
    })
    .catch(err => {
        return err;
    })
}


async function add(user) {
    const [id] = await deebee('users').insert(user);
  
    return (id);
  }