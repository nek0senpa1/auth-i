const knex = require('knex');
const knexConfig = require('../knexfile');

const deebee = knex(knexConfig.development);

module.exports = {
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
    deebee('users').insert(item);
    setTimeout( function(){
        return item;
      }, 2500);
}