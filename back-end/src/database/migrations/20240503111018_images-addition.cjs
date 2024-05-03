
exports.up = function(knex) {
    return knex.schema.createTable('images', function (table) {
        table.increments('id').primary();
        table.string('mimeType').notNullable();
        table.string('fileName').unique().notNullable();
        table.string('originalFileName').notNullable();
        table.string('extension').notNullable();
        table.binary('content').notNullable();
    })
    .alterTable('applications', function(table) {
        table.integer('imageId').unsigned().nullable();
        table.foreign('imageId').references('id').inTable('images');
        table.string('imageName');
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('images')
        .alterTable('applications', function(table) {
            table.dropColumn('imageId');
            table.dropColumn('imageName');
        });
};