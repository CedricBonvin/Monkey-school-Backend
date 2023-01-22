const express = require("express")
const route = express.Router()

const SAISON = require("../../model/model_saison")
const PROF = require("../../model/model_prof")
const DATESCOURS =require("../../model/model_datesCours")
const COURS =require("../../model/model_cours")

route.get("/", async (req,res) =>{
    let idLastSaison , allCours , saisonString
    let prof = PROF.findOne({where : { _idProf : req.query.idUser }, attributes : {exclude : "pw"}})

    // recherche derrnière saison
    try {
        let allSaison = await SAISON.findAll({order : [["saison", "desc"]]})
        idLastSaison = allSaison[0]._idSaison
        saisonString = allSaison[0].saison
    } catch(error) {return res.status(500).json({message : "derrnière saison introuvable", error})}
   
    // recherche tous les cours régulier de la derrnière saison
    try {
        allCours = DATESCOURS.findAll({
            where : {idTypeCours : 1, idSaison : idLastSaison},  // id type cours 1 = régulier
            include : [
                { model : COURS , as : "cours"},
                { model : PROF , as : "prof_1"},
                { model : PROF , as : "prof_2"},
                { model : PROF , as : "prof_3"},
                { model : PROF , as : "prof_4"},
            ]
        })   
    } catch (error) {return res.statusMessage(500).json({message : "Cours introuvable", error})}
    
    try {
        res.status(200).json({
            prof : await prof,
            coursSaison : await allCours,
            saisonString : saisonString
    })} catch (error) { res.status(500).json({message : "requete non exécuté ", error})}
    
})
route.put("/update", async (req, res) => {
    const {colonne, idCours} = req.body
    const idUser = req.query.idUser
    let updateData = {} 
    const cours = await DATESCOURS.findOne({where : {_idDatesCours : idCours}})
    
    // SI AUCUN PROF et qu'il n'existe pas ailleurs
    if(!cours[colonne]){
        function testSiExiste(){
            let valid = true
            cours.idProf_1 === idUser ? valid = false : ""
            cours.idProf_2 === idUser ? valid = false : ""
            cours.idProf_3 === idUser ? valid = false : ""
            cours.idProf_4 === idUser ? valid = false : ""
            return valid
        }
        try {
            if(testSiExiste()){
                updateData[colonne] = idUser
                await DATESCOURS.update( updateData, { where :{ _idDatesCours : idCours} })
                res.status(200).json({message : "date mise à jour"})
            }else{return res.status(400).json({message : "Tu veut être payé 2 fois ???"})}
        } catch (error) { return res.status(500).json({message : "mise à jour impossible"})}
    }
    // SI MEME PROF
    if(cours[colonne] && cours[colonne] === idUser){
        updateData[colonne] = null
        try {
            await DATESCOURS.update( updateData, { where :{ _idDatesCours : idCours} })
            res.status(200).json({message : "date mise à jour"})
        } catch (error) { return res.status(500).json({message : "mise à jour impossible"})}
    }
    // SI AUTRE PROF
    if(cours[colonne] && cours[colonne] !== idUser){
        res.status(400).json({message : "Tu peut pas effacer un pote !!!!! Petit coquin..."})
    }
})

module.exports = route