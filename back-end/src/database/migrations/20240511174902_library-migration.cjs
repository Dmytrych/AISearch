const Joi = require("joi");

exports.up = function(knex) {
    return knex.schema.createTable('userSaves', function (table) {
            table.integer('savedBy').references('id').inTable('users');
            table.integer('applicationId').references('id').inTable('applications');
        })
        .createTable('applicationComments', function (table) {
            table.increments('id').primary();
            table.integer('applicationId').notNullable();
            table.integer('createdBy').notNullable();
            table.text('content').notNullable();
            table.timestamps(true, true, true);
        })
        .createTable('applicationRates', function (table) {
            table.increments('id').primary();
            table.integer('applicationId').notNullable();
            table.integer('ratedBy').notNullable();
            table.integer('rating').notNullable();
            table.timestamps(true, true, true);
        })
        .alterTable('applications', function(table) {
            table.integer('rating').notNullable().defaultTo(0);
            table.integer('views').notNullable().defaultTo(0);
            table.integer('saves').notNullable().defaultTo(0);
        });
};


exports.down = function(knex) {
    return knex.schema
        .dropTable('userSaves')
        .dropTable('applicationComments')
        .dropTable('applicationRates')
        .alterTable('applications', function(table) {
            table.dropColumn('rating');
            table.dropColumn('views');
            table.dropColumn('saves');
        });
};
