exports.up = function(knex) {
    return knex.schema.alterTable('applications', (table) => {
        table.float('rating').alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('applications', (table) => {
        table.integer('rating').alter();
    });
};
