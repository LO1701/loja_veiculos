require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  // test: {
  //   username: process.env.USERNAME,
  //   password: process.env.PASS,
  //   database: process.env.DATABASE,
  //   host: process.env.HOST,
  //   dialect: process.env.DIALECT
  // },
  // production: {
  //   username: process.env.USERNAME,
  //   password: process.env.PASS,
  //   database: process.env.DATABASE,
  //   host: process.env.HOST,
  //   dialect: process.env.DIALECT
  // } 
}