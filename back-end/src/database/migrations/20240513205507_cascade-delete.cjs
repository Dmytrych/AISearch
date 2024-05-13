
exports.up = function(knex) {
    return knex.schema
        .alterTable('userSaves', table => {
            table.dropForeign('savedBy');
            table.dropForeign('applicationId');
        })
        .alterTable('userSaves', (table) => {
            table.foreign('savedBy').references('users.id').onDelete('CASCADE');
            table.foreign('applicationId').references('applications.id').onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('userSaves', table => {
            table.dropForeign('savedBy');
            table.dropForeign('applicationId');
        })
        .alterTable('userSaves', table => {
            table.foreign('savedBy').references('users.id');
            table.foreign('applicationId').references('applications.id');
        });
};
