
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
            table.increments('id').primary();
            table.string('nickname').notNullable();
            table.string('email').notNullable();
            table.string('passwordHash').notNullable();
            table.boolean('isAdmin').notNullable();
            table.timestamps(true, true, true);
        });
};

exports.down = function(knex) {
    return knex
        .dropTable('users');
};
