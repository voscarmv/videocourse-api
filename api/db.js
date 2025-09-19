const knexConfig = require('../knexfile');
const knex = require('knex');

const pg = knex(knexConfig[process.env.NODE_ENV || 'development']);

// CRUD

async function getAllItems(){
    return await pg.select().table('items');
}

async function getItem(id){
    return await pg('items').where({id});
}

async function insertItem(data){
    return await pg('items').insert(data);
}

module.exports = {
    getAllItems,
    getItem,
    insertItem
}