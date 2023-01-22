

// **********    MODEL COURS    *************


const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require("../BDD_connection")
const TypeCours = require("../model/model_typeCours")
const Saison = require("../model/model_saison")



class Cours extends Model {}

Cours.init({
  // Model attributes are defined here
  _idCours : {
    type: DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true,
    allowNull: false
  },
  nom: {
    type: DataTypes.TEXT,

  },
  jour: {
    type: DataTypes.TEXT,

  },
  heure: {
    type: DataTypes.TEXT,

  },
  age: {
    type: DataTypes.TEXT,

  },
  duree: {
    type: DataTypes.FLOAT,

  },
}, 
{
    // Other model options go here
        tableName : "cours",
        sequelize, // We need to pass the connection instance
        timestamps : false,
        modelName: 'Cours' // We need to choose the model name
});

// FK
//SAISON
Saison.hasMany(Cours , {foreignKey : "idSaison" , as : "cours_saison"})
Cours.belongsTo(Saison , {foreignKey : "idSaison" , as : "cours_saison"})

//TYPE-COURS
TypeCours.hasMany(Cours , {foreignKey : "idTypeCours" , as : "type_cours"})
Cours.belongsTo(TypeCours , {foreignKey : "idTypeCours" , as : "type_cours"})



// try {
//   Cours.sync() // Créer la table
//   Cours.sync({alter : true}) // pour créer/mofier 
  
// } catch (error) {
//   console.log(error)
// }



module.exports = Cours