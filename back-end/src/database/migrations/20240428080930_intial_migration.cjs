exports.up = async function(knex) {
    return knex.schema.createTable('applications', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('url').notNullable();
        table.text('subtitle');
        table.text('description');
        table.timestamps(true, true, true);
    }).createTable('labels', (table) => {
        table.increments('id');
        table.integer('applicationId').unsigned();
        table.foreign('applicationId').references('id').inTable('applications');
        table.string('name').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.dropTable('applications').dropTable('labels');
};
