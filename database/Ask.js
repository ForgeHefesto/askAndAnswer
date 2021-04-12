const Sequelize = require('sequelize')
const connection = require ('./database')

const askModel = connection.define('questions',{
    title:{
        type:Sequelize.STRING,
        allowNull: false
    },
    describe:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

askModel.sync({force: false}).then(() =>{
    console.log('tabela criada')
})

module.exports = askModel