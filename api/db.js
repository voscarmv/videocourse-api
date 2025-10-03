const knexConfig = require('../knexfile');
const knex = require('knex');

const pg = knex(knexConfig[process.env.NODE_ENV || 'development']);

// CRUD
async function createContent(data){
    return await pg('content').returning('id').insert(data);
}
async function readContent(id){
    return await pg('content').where({id});
}
async function readAllContent(){
    return await pg('content');
}
async function updateContent(id, data){
    return await pg('content').where({id}).update(data);
}
async function deleteContent(id){
    return await pg('content').where({id}).del();
}

async function createSection(data){
    return await pg('section').insert(data);
}
async function readSection(content_id){
    return await pg('section').where({content_id});
}
async function updateSection(id, data){
    return await pg('section').where({id}).update(data);
}
async function deleteSection(id){
    return await pg('section').where({id}).del();
}

async function createAccessKey(data){
    return await pg('accesskey').returning('id').insert(data);
}
async function readAccessKey(content_id, key){
    return await pg('accesskey').where({content_id, key});
}
async function updateAccessKey(id, data){
    return await pg('accesskey').returning('key').where({id}).update(data);
}
async function deleteAccesKey(key){
    return await pg('accesskey').where({key}).del();
}

module.exports = {
    createContent,
    readContent,
    readAllContent,
    updateContent,
    deleteContent,
    createSection,
    readSection,
    updateSection,
    deleteSection,
    createAccessKey,
    readAccessKey,
    updateAccessKey,
    deleteAccesKey,
}