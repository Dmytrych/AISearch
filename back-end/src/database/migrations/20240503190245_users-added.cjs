
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
            table.increments('id').primary();
            table.string('nickname').notNullable();
            table.string('email').notNullable();
            table.string('passwordHash').notNullable();
            table.timestamps(true, true, true);
        })
        .createTable('roles', function (table) {
            table.increments('id').primary();
            table.string('name').unique();
        })
        .createTable('userRoles', function (table) {
            table.integer('userId').unsigned();
            table.foreign('userId').references('id').inTable('users');
            table.integer('roleId').unsigned();
            table.foreign('roleId').references('id').inTable('roles');
        })
};

exports.down = function(knex) {
    return knex
        .dropTable('users')
        .dropTable('userRoles')
        .dropTable('roles');
};
