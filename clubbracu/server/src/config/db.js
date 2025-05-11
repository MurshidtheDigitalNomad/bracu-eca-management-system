const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bracu-club-management',
  password: 'murshid',
  port: 5432, // default port
})

module.exports = pool;