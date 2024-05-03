exports.seed = function(knex) {
    return knex('roles').del()
        .then(function () {
            return knex('roles').insert([
                { id: 1, name: 'Admin' },
                { id: 2, name: 'User' },
            ]);
        });
};
