import knex from 'knex'

const connection = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
})

export default process.env.APP_QUERY_LOGGING === 'ON' 
  ? connection.on('query', (query) => {
    console.log(query.sql, ',', `[${query.bindings ? query.bindings.join(',') : ''}]`);
  }) 
  : connection