const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Family = require('../../models/example/family');
var familiesJSON = require('../data/example/families.json');

const seeder = async (req, res) => {  
    try {
       await mongoose.connect(process.env.MONGODB_URI) 

       await Family.collection.drop();    // Delete families collection   
       const families = await Family.insertMany(familiesJSON.families);
       mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}   


seeder();