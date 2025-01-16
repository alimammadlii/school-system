require('dotenv').config() // .env dosyasını yükler

module.exports = {
  development: {
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_DATABASE,     
    host: process.env.DB_HOST || '127.0.0.1', 
    dialect: process.env.DB_DIALECT || 'postgres', 
  },
  test: {
    username: process.env.DB_USERNAME || 'test_user',
    password: process.env.DB_PASSWORD || 'test_password',
    database: process.env.DB_DATABASE || 'test_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
}