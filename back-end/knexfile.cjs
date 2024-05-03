const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE_NAME,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: path.join(__dirname, '/src/database/migrations'),
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.js`;
      },
    },
    seeds: {
      directory: path.join(__dirname, '/src/database/seeds'),
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: 'pg',
    connection: {
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE_NAME,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT,
    },
    migrations: {
      tableName: 'db_migrations',
      directory: path.join(__dirname, '/src/database/migrations'),
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.js`;
      },
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
