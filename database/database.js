const Sequelize = require('sequelize')

const connection = new Sequelize('askandanswer','root','Camiza10',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;