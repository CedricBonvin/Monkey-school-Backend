
const Sequelize = require("sequelize");


let f = ()=> {
    let connection = new Sequelize('adminMonkey', 'root', 'root', {
                      host: 'localhost',
                      dialect:  "mysql",
                    });  

    // let connection = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    //     host: 'monkey-school.ch',
    //     dialect:  "mysql",
    //   });  
                     
   
    async function tryConnection (){
        try {
           
            await connection.authenticate();
            console.log('Base de donnée connecté');
           
        } catch (error) {
            console.error('NON CONNECTE A LA BASE DE DONNEE', error);
        }
    }
     tryConnection()
     
    return(connection)
                    
}
module.exports = f()