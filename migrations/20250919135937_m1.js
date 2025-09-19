/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable('content', function (table) {
            table.string('id').primary().unique().notNullable();
            table.string('name').notNullable();
            table.text('description');
            table.timestamps(true, true); // created_at and updated_at
        })
        .createTable('section', function (table) {
            table.string('id').primary().unique().notNullable();
            table.string('content_id')
                .references('id')
                .inTable('content')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table.string('name').notNullable();
            table.string('vidurl');
            table.text('markdown');
            table.timestamps(true, true); // created_at and updated_at
        })
        .createTable('accesskey', function (table) {
            table.increments('id').primary();
            table.string('content_id')
                .references('id')
                .inTable('content')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
                .notNullable();
            table.string('key');
            table.timestamps(true, true); // created_at and updated_at
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('accesskey')
        .dropTable('section')
        .dropTable('content');
};
