require('dotenv').config() // .env dosyasını yükler
const { Sequelize } = require('sequelize');

// Veritabanı bağlantı ayarları
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'posgres', 
  logging: false 
});

module.exports = sequelize;