
exports.up = function(knex) {
  return knex.schema.alterTable('applications', function(table) {
      table.integer('ratedCount').notNullable().defaultTo(0);
  }).alterTable('applicationRates', function(table) {
      table.string('comment').nullable();
  });
};

exports.down = function(knex) {
    return knex.schema
        .alterTable('applications', function(table) {
            table.dropColumn('ratedCount');
        })
        .dropTable('applicationRates');
};
