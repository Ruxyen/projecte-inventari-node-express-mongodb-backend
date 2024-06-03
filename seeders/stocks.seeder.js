const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "../.env" });


const Location = require("../models/location");
const Material = require("../models/material");
const Category = require("../models/category");
const Stock = require("../models/stock");

const seeder = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        await Stock.collection.drop();

        let materials = await Material.find();
        let locations = await Location.find();

       
        

        for (let material of materials) {        
            
             for (let i=0; i<10; i++) {
                    let num = Math.floor(Math.random() * locations.length);
                    let location = locations[num];
                    await Stock.create({ units:  10 , "location": location._id, "material": material._id })
            }


        }
        

   
    
    mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}

seeder();