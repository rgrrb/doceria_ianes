import knex from 'knex';

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'doceria_gourmet_ianes'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
});

db.raw('SELECT 1')
  .then(() => {
    console.log('teste!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MySQL:', error.message);
  });

export default db;
