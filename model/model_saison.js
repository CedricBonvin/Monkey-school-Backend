
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../BDD_connection")

class Saison extends Model {}

Saison.init({
        _idSaison : {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull: false
        },
        saison: {
            type: DataTypes.STRING,
            unique : true
        },
    },
    {
        // Other model options go here
        tableName : "saison",
        sequelize, // We need to pass the connection instance
        timestamps : false,

        modelName: 'Saison' // We need to choose the model name
    }
);

// Allo.sync() // Créer la table
// Allo.sync({alter : true}) // pour créer/mofier 

module.exports = Saison