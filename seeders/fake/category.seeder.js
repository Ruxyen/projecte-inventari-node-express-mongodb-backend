const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../../.env" }); // where is the '.env' file

const Category = require('../../models/category');
//var categoriesJSON = require('../data/categories.json');

const seeder = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        await Category.collection.drop();    // Delete categories collection   
        //const categories = await Category.insertMany(categoriesJSON.categories);

        for (let i = 0; i < 20; i++) {
            await Category.create({ name: "category" + i });
        }

        mongoose.connection.close();

    }
    catch (error) {
        console.log(error);
    }
}

seeder();