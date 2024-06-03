var User= require("../models/user");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });


// AUTH API

// login
const login = async (req, res) => {  
  var email = req.body.email;
  var password = req.body.password;
  
  console.log(process.env.SECRET)
  try {
        var user = await User.findOne({ email: email })
            .populate({
                path : 'role',
                select: 'name' ,
                populate : {
                  path : 'actions',
                  select: 'name' 
                }
              }) ;          
        if (!user) 
              return res.status(402).json({errors: [{msg:"L'usuari no existeix."}]}) 
                  
        if (!bcrypt.compareSync(password, user.password)) 
            return res.status(402).json({errors: [{msg:"El password no és correcte."}]})
                
        var userData = {
            'id': user.id,     
            'name': user.name,
            'email': user.email,
            'role': user.role,                  
        }

        const maxAge = 3 * 60 * 60; // 3hrs in sec
        const token = jwt.sign(
            userData,
            process.env.SECRET,
            {
               expiresIn: maxAge, 
            }
         );
        
        userData.token = token       

        res.status(200).json(userData) 
                
            
        }   
        catch(error) {
          return res.status(402).json({errors: [{msg:"There was a problem logging you into the system!."}]}) 
        }  
  
}

module.exports = {
    login,
   
  }