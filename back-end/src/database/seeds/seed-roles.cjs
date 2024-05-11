const {hashSync, genSaltSync} = require("bcrypt");
exports.seed = function(knex) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert({
                username: "Dmytro Habaznia",
                email: "karambolrul@gmail.com",
                isAdmin: true,
                passwordHash: hashSync("test", genSaltSync(10))
            });
        });
};
