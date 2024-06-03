const mongoose = require("mongoose");
const bcrypt = require('bcryptjs'); 
var dotenv = require('dotenv');

dotenv.config({path: "../../.env"});

const User = require('../../models/user');

const seeder = async (req, res) => {  
    try {
      
       await mongoose.connect(process.env.MONGODB_URI) 

       await User.collection.drop();   
       
       for(let i=0;i<20;i++) {
            const hashedPassword = await bcrypt.hash("password"+i, 12); 
            await User.create({username:"user"+i, password: hashedPassword, email:"email"+i}) 
       }

       mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}   

seeder();
