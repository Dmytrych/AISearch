
exports.up = function(knex) {
    return knex.schema
        .alterTable('labels', table => {
            table.dropForeign('applicationId');
        })
        .alterTable('labels', (table) => {
            table.foreign('applicationId').references('applications.id').onDelete('CASCADE');
        })
        .alterTable('applicationRates', table => {
            table.dropColumn('applicationId');
        })
        .alterTable('applicationRates', (table) => {
            table.integer('applicationId').references('applications.id').onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('labels', table => {
            table.dropForeign('applicationId');
        })
        .alterTable('labels', table => {
            table.foreign('applicationId').references('applications.id');
        })
        .alterTable('applicationRates', table => {
            table.dropForeign('applicationId');
        })
        .alterTable('applicationRates', (table) => {
            table.foreign('applicationId').references('applications.id');
        });
};
