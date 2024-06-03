const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Family = require('../../models/example/family');
const CF = require('../../models/example/cf');
var cfsJSON = require('../data/example/cfs.json');


const seeder = async (req, res) => {  
    try {
       await mongoose.connect(process.env.MONGODB_URI) 

       await CF.collection.drop();    // Delete cfs collection   
       const families = await Family.find({});         

       cfsJSON.cfs[0].family =   families[0].id;
       cfsJSON.cfs[1].family =   families[0].id;
       cfsJSON.cfs[2].family =   families[1].id;
       cfsJSON.cfs[3].family =   families[1].id;
       cfsJSON.cfs[4].family =   families[1].id;
       const cfs = await CF.insertMany(cfsJSON.cfs);       
       
       mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}   


seeder();