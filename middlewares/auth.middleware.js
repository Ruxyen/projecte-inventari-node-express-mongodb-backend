
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });


const isAuth = async (req, res,next) => { 
       
    // TOKEN BEARER
   
    if(!req.headers['authorization']) {     
        return res.status(401).json({errors: [{msg:"Not authorized"}]}) 
    }

    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    
       
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({errors: [{msg:"Not authorized"}]}) 
            } else {                
                // Afegim següents camps a la petició
                console.log(decodedToken)
                req.user_id = decodedToken.id;
                req.token = token;
                req.role = decodedToken.role;
                next()            
            }
    })
    
}

const withRole =  (role) => { 

    return function (req, res, next)  {

        if(role instanceof Array) {  // role és un array a l'estil ['admin','operator', ...]
            if(req.role instanceof Array) { // req.role és de l'estil [{id:1, name:"admin"},{id:2, name: "operator"},...]
                console.log("Array - Array")
                if( req.role.some( element =>  role.includes(element.name)))  return next();           
            }
            else { // req.role és per exemple {id:1, name: "admin"}
                console.log("Array - String")
                if( role.includes(req.role.name)) return next();
            }            
        }
        else { // role és per exemple "admin"
           
            if(req.role instanceof Array) { // req.role és de l'estil [{id:1, name:"admin"},{id:2, name: "operator"},...]
                console.log("String - Array")
                if( req.role.some( element => element.name === role)) return next();
            }
            else { // req.role és per exemple {id:1, name: "admin"}
                console.log("String - String")
                if( role == req.role.name) return next();               
                
            }           
        }
        return res.status(401).json({errors: [{msg:"You don't have suficient privileges to do this action."}]})
              
    }
}

module.exports = {
    isAuth,
    withRole
   
  }

