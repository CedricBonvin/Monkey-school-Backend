const express = require("express")
const route = express.Router()
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const PROF = require("../../model/model_prof")
const SAISON = require("../../model/model_saison")
const TYPECOURS = require("../../model/model_typeCours")
const DATESCOURS = require("../../model/model_datesCours")
const COURS = require("../../model/model_cours");
const { findOne } = require("../../model/model_saison");

route.get("/", async (req, res) => {
    try {
        const saisons = await SAISON.findAll()
        const typeCours = await TYPECOURS.findAll()
        const profs = await PROF.findAll()
        res.status(200).json({succes : true, allSaisons : saisons, allTypeCours : typeCours, profs : profs})
        
    } catch (error){ res.status(500).json({succes : false, message : "Information non trouvé", error})}
})

route.post("/recherche", async(req , res) => {
    try {
        const body = await DATESCOURS.findAll({
                       
            where : {
                idSaison : req.body.idSaison,
                [Op.or] : [
                    {idProf_1 : req.body.idProf},
                    {idProf_2 : req.body.idProf},
                    {idProf_3 : req.body.idProf},
                    {idProf_4 : req.body.idProf}
                ],
            },
            include : [
                {model : PROF, as : "prof_1" , attributes : {exclude : ["pw"]}},
                {model : PROF, as : "prof_2" , attributes : {exclude : ["pw"]}},
                {model : PROF, as : "prof_3" , attributes : {exclude : ["pw"]}},
                {model : PROF, as : "prof_4" , attributes : {exclude : ["pw"]}},
                {model : COURS, as : "cours" , attributes : {exclude : ["pw"]}},
                
            ],
            order : [["idCours" , "asc"],["date" , "asc"]],
            
        })
        const prof = await PROF.findOne({
            where : {_idProf : req.body.idProf},
             attributes : ["nom", 'prenom', 'tarifHeure']
        })

        res.status(200).json({succes : true, body: body, prof: prof})
    } catch (error) { 
        console.log(error)
        res.status(500).json({succes : false, message : "Impossible de faire la recherche",error }) }
})

module.exports = route