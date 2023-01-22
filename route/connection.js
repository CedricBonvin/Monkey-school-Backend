const express = require("express")
const route = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
const PROF = require("../model/model_prof")

route.post("/connection", async (req,res, next) => {
    const {pw , user} = req.body
    let prof
    try {
        prof = await PROF.findOne({
            attributes : ['_idProf', 'role'],
            where : { prenom : user, pw : pw}
        })
    } catch{}
    if(!prof){ return res.status(400).json({message : "Mot de passe ou prénom incorrect"}) }
    try {
        const payload = { role : prof.role, idUser : prof._idProf }
        const token =  jwt.sign(payload, process.env.connection_token,{expiresIn: '1h'})
        res.status(200).json({token : token, prof : prof})
    } catch (error) {
        res.status(500).json({message : "impossible de créer le token", error,})
    }  
})
module.exports = route