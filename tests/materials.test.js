const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Material = require("../models/material");
const Category = require('../models/category');




require("dotenv").config();


let material = null;
let category = null;


/* Connecting to the database before all test. */
beforeAll(async () => {
      await mongoose.connect(process.env.MONGODB_URI);
      material = new Material();
      category = new Category();
      category.name = "category";
      await category.save();


   material = new Material();
   material.name = "material de prova";
   material.image = "image.png";
   material.description = "description";
   material.category = category._id;
   await material.save();


});


/* Dropping the database and closing connection after all test. */
afterAll(async () => { 
 await mongoose.connection.close();
});




describe("GET /api/materials", () => {
   test("Hauria de retornar el llistat de tots els materials", async () => {
       return await request(app)
           .get("/api/materials")   
           .expect(200)
   });
});


describe("GET /api/materials/:id", () => {
   test('Hauria de retornar un material', async () => {
       return await request(app)
           .get(`/api/materials/${material.id}`)         
           .expect(200)
           .expect('Content-Type', /application\/json/)
           .expect(response => {              
               expect(response.body.name).toEqual("material de prova")       
             })
          
   });
})


describe("POST /api/materials", () => {
   test("Hauria de crear un material", async () => {
       // Crear nova categoria
       const newCategory = await Category.create({ name: "Test Category" });


       const newMaterial = {
           name: "TEST",
           image: "image.png",
           description: "descripcio",
           category: newCategory._id
       };


       return await request(app)
           .post("/api/materials")
           .send(newMaterial)
           .expect(200)
           .then(async ({ body }) => {
               //console.log("Expected Category ID:", newCategory._id.toString());
               //console.log("Received Category ID:", body.category);
               expect(body.name).toEqual("TEST");
               expect(body.image).toEqual("image.png");
               expect(body.description).toEqual("descripcio");
               expect(body.category.toString()).toEqual(newCategory._id.toString()); //convertir els dos ids a String


               await Material.findByIdAndDelete(body.id);
           });
   });
});


describe("POST /api/materials", () => {
   test("Hauria de retornar error al crear un material i no passar-li el nom", async () => {
       const newMaterial = {
           nameNO:""  
       }
   
       return await request(app)
           .post("/api/materials")      
           .send(newMaterial)
           .expect(400)
        
   });
});
describe("POST /api/materials", () => {
   test("Hauria de retornar error al crear un material amb nom en blanc", async () => {
       const newMaterial = {
           name:""  
       }
   
       return await request(app)
           .post("/api/materials")      
           .send(newMaterial)
           .expect(400)
        
   });
});
describe("POST /api/materials", () => {


   test("Hauria de retornar error al crear un material amb nom massa llarg", async () => {


   const newMaterial = {
       name: "aquest nom de material es massa llarg i dona un super error"
   };
       return await request(app)
           .post("/api/materials")
           .send(newMaterial)
           .expect(400);
   });
});








describe("POST /api/materials", () => {
   test("Hauria de retornar error al crear un material i no passar-li el nom", async () => {
       const newMaterial = {
           nameNO:""  
       }


       return await request(app)
           .post("/api/materials")      
           .send(newMaterial)
           .expect(400)
        
   });
});
describe("POST /api/materials", () => {
    test("Hauria de retornar error al crear un material amb nom en blanc", async () => {


       const newMaterial = {
           name:""  
       }
       return await request(app)
           .post("/api/materials")      
           .send(newMaterial)
           .expect(400)
        
   });
});


describe("PUT /api/materials/:id", () => {
   test("Hauria d'actualitzar un material", async () => {


       const updateMaterial = {
           name:"TEST-CANVIAT"  
       }
       const res = await request(app)        
           .put(`/api/materials/${material.id}`)
           .send(updateMaterial);        
     
       expect(res.statusCode).toBe(201);
       expect(res.body.name).toBe("TEST-CANVIAT")
   });  
});
describe("PUT /api/materials/:id", () => {
   test("Hauria de retornar error a l'actualitzar un material al posar el nom en blanc", async () => {
       const updateMaterial = {
           name:""  
       }
   
       const res = await request(app)        
           .put(`/api/materials/${material.id}`)
           .send(updateMaterial);        
     
       expect(res.statusCode).toBe(404);
    
   });  
});
describe("DELETE /api/materials/:id", () => {
   test("Hauria d'esborrar un material", async () => {
       return await request(app)
           .delete(`/api/materials/${material.id}`)        
           .expect(200)          
   });
});
describe("DELETE /api/materials/:id", () => {
   test("Hauria de retornar error a l'esborrar un material que no existeix", async () => {
       return await request(app)
           .delete(`/api/materials/${material.id}`)        
           .expect(404)          
   });
});
