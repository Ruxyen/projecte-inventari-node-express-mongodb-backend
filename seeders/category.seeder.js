const mongoose = require("mongoose");
var dotenv = require('dotenv');
dotenv.config({ path: "../.env" });

const Category = require('../models/category');

const seeder = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Category.collection.drop();

        const categories = [
            {
                name: "General", children: [
                    {
                        name: "Material Informàtic", children: [
                            { name: "Impressores" },
                            {
                                name: "Ordinadors", children: [
                                    { name: "Sobretaula" },
                                    { name: "Protatil" },
                                ]
                            },
                            { name: "Programari" },
                        ]
                    },
                    {
                        name: "Material d'Oficina", children: [
                            { name: "Bolígrafs i llapisos" },
                            { name: "Arxivadors" },
                        ]
                    },
                    {
                        name: "Mobiliari Escolar", children: [
                            { name: "Taules" },
                            { name: "Cadires" },
                            { name: "Pissarres" },
                            { name: "Armaris" },
                            { name: "Bancs" },
                            { name: "Prestatgeries" },
                        ]
                    },
                ]
            }
        ];

        const saveCategories = async (categories, parent = null) => {
            for (const categoryData of categories) {
                let category;
                if (parent) {
                    category = new Category({ name: categoryData.name, parent_id: parent });
                } else {
                    category = new Category({ name: categoryData.name });
                }

                await category.save();

                if (categoryData.children) {
                    await saveCategories(categoryData.children, category._id);
                }
            }
        };

        await saveCategories(categories);

        mongoose.connection.close();
    } catch (error) {
        console.log(error);
    }
};

seeder();