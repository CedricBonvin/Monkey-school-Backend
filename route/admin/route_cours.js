const express = require("express")
const route = express.Router()
const SAISON = require("../../model/model_saison")
const TYPECOURS = require("../../model/model_typeCours")
const COURS = require("../../model/model_cours")
const PROF = require("../../model/model_prof")
const DATESCOURS = require("../../model/model_datesCours")


// ************  ROUTE ADMIN COURS   **********

//ok
route.get("/" , async (req, res) => {
    try {
        const saisons = await SAISON.findAll({
            order : [["saison" , "desc"]]
        })
        const typeCours = await TYPECOURS.findAll()
        res.status(200).json({saisons : saisons, typeCours: typeCours, message : "saisons et le type de cours ont été trouvées"}) 
    } catch (error) {
        res.status({message : "impossible de trouvé les cours et les types de cours",error})
    }
})
// ok
route.post("/creerCours", async (req , res) => {
   try {
        await COURS.create({...req.body})
        res.status(200).json({ message : "Le cours à bien été créer"})
   } catch (error){res.status(500).json({message : "Impossible de créer le cours", error})}
})
//ok
route.get("/callCoursSaison", async (req,res) => {
    try {
        const coursSaison = await COURS.findAll({
            where : {
                idSaison : req.query.idSaison
            },
            include : [{model : SAISON , as : "cours_saison"}]
        })
        res.status(200).json({cours : coursSaison, message : "Tout les cours de la saison ont été trouvés"})
    } catch (error){res.status(500).json({error, message : "impossible de trouver les cours de la saisons"})}
})
// ok
route.put("/modifierCours", async (req,res) => {
    try {
        await COURS.update({...req.body}, {where : {_idCours : req.body._idCours} })
        const cours = await COURS.findAll({
            where : { idSaison : req.query.idSaison}
        })
        res.status(200).json({tabCours : cours, message : "Cours mis à jour"})
    } catch (error){res.status(500).json({message : "Prof non modifier", error})}
})
// ok
route.delete("/supprimerCours", async (req ,res) => {
    console.log(req.body)
    try {
        await COURS.destroy({where : {_idCours : req.body.idCours}})
        const tabCours = await COURS.findAll({
            where : {idSaison : req.body.idSaison}
        })
        res.status(200).json({message : "Saison supprimer", tabCours : tabCours})
    } catch (error){
        console.log(error)
        res.status(500).json({message : "Impossible de supprimer la saison", error})}

})
// ok
route.post("/insertDateCours", async (req,res) => {
    console.log(req.body)
    try {
        const insertDates = await DATESCOURS.bulkCreate(req.body)
        if(insertDates.length){
            res.status(200).json({message : "Dates ajouté avec succes"})
        }else{return res.status(500).json({message : "Ajout des dates impossible",error})}
    } catch (error) { 
        res.status(500).json({message : "Ajout des dates impossible",error})}
})
// ok
route.get("/callDatesDuCours",async (req,res) => {

    let idCours = req.query.idCours
    try {
        const cours = await COURS.findOne({
            where : {
                _idCours : idCours,
            },
            include : [
                {model : SAISON, as : "cours_saison"},
                {model : TYPECOURS, as : "type_cours"}
            ]
        })
        const dates = await DATESCOURS.findAll(
            {where : { idCours : idCours },
            include : [
                {model : SAISON, as : "saisons"},
                {model : PROF, as : "prof_1"},
                {model : PROF, as : "prof_2"},
                {model : PROF, as : "prof_3"},
                {model : PROF, as : "prof_4"},
                {model : COURS, as : "cours"},
            ]
        })
        return res.status(200).json({dates : dates, coursSelected : cours})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Cours non trouvés", error})

    }
})
module.exports=route
