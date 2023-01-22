const express = require("express")
const app = express()
const fallback = require('connect-history-api-fallback');
const path = require("path")
// ********** ROUTE

//admin
const route_Prof = require("./route/admin/route_prof")
const route_Cours = require("./route/admin/route_cours")
const route_Saison = require("./route/admin/route_saison")
const route_check = require("./route/admin/route_check")

// prof
const route_cours_Prof = require("./route/prof/route_cours")
const route_Info = require("./route/prof/route_info")
const route_historique = require("./route/prof/route_historique")

const route_Connection = require("./route/connection")
const auth = require("./middleware/auth")


app.use(express.json())
app.use(express.urlencoded({extended : true}))


//RELOAD
// app.use(express.static(path.join(__dirname, '..', 'admin.monkey-school.ch'))); 
// app.use(fallback())



app.use((req, res, next) => {                              
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

let port = 2000
app.listen(port,(err) => {
    if(err){console.log("impossible d'écouter le serveur")}
    else{
        console.log("Apllication en écoute sur le port " + port)
    }
})

// ROUTE ADMIN
app.use("/admin/profs",auth.admin, route_Prof)
app.use("/admin/cours",auth.admin, route_Cours)
app.use("/admin/saison",auth.admin, route_Saison)
app.use("/admin/check",auth.admin, route_check)


// ROUTE PROF
app.use("/prof/info",auth.prof, route_Info)
app.use("/prof/historique",auth.prof, route_historique)
app.use("/prof/cours",auth.prof, route_cours_Prof)

//ROUTE CONNECTION
app.use("/",route_Connection)

