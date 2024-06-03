const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Category = require("../models/category");


require("dotenv").config();

let category = null;

/* Connecting to the database before all test. */
beforeAll(async () => {
       await mongoose.connect(process.env.MONGODB_URI);
       category = new Category();
       category.name = "categoria de prova";
       await category.save();
});

/* Dropping the database and closing connection after all test. */
afterAll(async () => {  
  await mongoose.connection.close();
});


describe("GET /api/categories", () => {
    test("Hauria de retornar el llistat de totes les famílies", async () => {
        return await request(app)
            .get("/api/categories")    
            .expect(200)
    });
});

describe("GET /api/categories/:id", () => {
    test('Hauria de retornar una categoria', async () => {
        return await request(app)
            .get(`/api/categories/${category.id}`)          
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.name).toEqual("categoria de prova")        
              })
            
    });
})

describe("POST /api/categories", () => {
    test("Hauria de crear una categoria", async () => {
        const newCategory = {
            name:"TEST"    
        }
        return await request(app)
            .post("/api/categories")        
            .send(newCategory)
            .expect(200)
            .then( async ({body})=>{
                expect(body.name).toEqual("TEST")
                const createdCategoryId = body._id;
                await Category.findByIdAndDelete(createdCategoryId);               
            })
    });
});

describe("POST /api/categories", () => {
    test("Hauria de retornar error al crear una categoria i no passar-li el nom", async () => {
        const newCategory = {
            nameNO:""    
        }
        return await request(app)
            .post("/api/categories")        
            .send(newCategory)
            .expect(400)
    });
});

describe("POST /api/categories", () => {
    test("Hauria de retornar error al crear una categoria amb nom en blanc", async () => {
        const newCategory = {
            name:""    
        }
        return await request(app)
            .post("/api/categories")        
            .send(newCategory)
            .expect(400)
           
    });
});

describe("POST /api/categories", () => {
    test("Hauria de retornar error al crear una categoria amb nom massa llarg", async () => {
        const newCategory = {
            name:"aquest nom de familia es massa llarg i dona un super error"    
        }
        return await request(app)
            .post("/api/categories")        
            .send(newCategory)
            .expect(400)
           
    });
});


describe("PUT /api/categories/:id", () => {
    test("Hauria d'actualitzar una categoria", async () => {
        const updateCategory = {
            name:"TEST-CANVIAT"    
        }
        const res = await request(app)          
            .put(`/api/categories/${category.id}`)
            .send(updateCategory);          
        
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("TEST-CANVIAT")
    });    
});

describe("PUT /api/categories/:id", () => {
    test("Hauria de retornar error a l'actualitzar una categoria al posar el nom en blanc", async () => {
        const updateCategory = {
            name:""    
        }
        const res = await request(app)          
            .put(`/api/categories/${category.id}`)
            .send(updateCategory);          
        
        expect(res.statusCode).toBe(400);
       
    });    
});

describe("DELETE /api/categories/:id", () => {
    test("Hauria d'esborrar una categoria", async () => {
        return await request(app)
            .delete(`/api/categories/${category.id}`)          
            .expect(200)            
    });
});

describe("DELETE /api/categories/:id", () => {
    test("Hauria de retornar error a l'esborrar una categoria que no existeix", async () => {
        return await request(app)
            .delete(`/api/categories/${category.id}`)          
            .expect(404)            
    });
});

