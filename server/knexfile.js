module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'blake',
    },
  },
  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'blake',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'blake',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};
