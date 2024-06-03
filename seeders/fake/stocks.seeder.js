const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: "../../.env" });

const Building = require("../../models/building");
const Zone = require("../../models/zone");

const Location = require("../../models/location");
const Material = require("../../models/material");
const Category = require("../../models/category");
const Stock = require("../../models/stock");

const seeder = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        await Stock.collection.drop();

        let building = await Building.create({ "name": "building 1" });
        let zone = await Zone.create({ "name": "prova", "blueprint":"blueprint prova", "building": building._id });
        let location = await Location.create({ "name":"aula 1", "zone": zone._id });

        let category = await Category.create({ "name": "categoria 1" });      
        let material = await Material.create({ "name": "material 1", "image": "image1.png", "category": category._id });
        for (let i = 0; i < 20; i++) {
            await Stock.create({ units:  i+1 , "location": location._id, "material": material._id })

        }
   
    
    mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}

seeder();
