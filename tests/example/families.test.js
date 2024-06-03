const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const Family = require("../../models/example/family");


require("dotenv").config();

let family = null;

// Connecting to the database before all test.
beforeAll(async () => {
       await mongoose.connect(process.env.MONGODB_URI);
       family = new Family();
       family.name = "família de prova";
       await family.save();
});

// Dropping the database and closing connection after all test. 
afterAll(async () => {  
  await mongoose.connection.close();
});


describe("GET /api/example/families", () => {
    test("Hauria de retornar el llistat de totes les famílies", async () => {
        return await request(app)
            .get("/api/example/families")    
            .expect(200)
    });
});

describe("GET /api/example/families/:id", () => {
    test('Hauria de retornar una família', async () => {
        return await request(app)
            .get(`/api/example/families/${family.id}`)          
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.name).toEqual("família de prova")        
              })
            
    });
})

describe("POST /api/example/families", () => {
    const newFamily = {
        name:"TEST"    
    }

    test("Hauria de crear una família", async () => {
        return await request(app)
            .post("/api/example/families")        
            .send(newFamily)
            .expect(200)
            .then(({body})=>{
                expect(body.name).toEqual("TEST")
                Family.findByIdAndDelete(body.id);               

            })
    });
});

describe("POST /api/example/families", () => {
    const newFamily = {
        nameNO:""    
    }

    test("Hauria de retornar error al crear una família i no passar-li el nom", async () => {
        return await request(app)
            .post("/api/example/families")        
            .send(newFamily)
            .expect(400)
           
    });
});

describe("POST /api/example/families", () => {
    const newFamily = {
        name:""    
    }

    test("Hauria de retornar error al crear una família amb nom en blanc", async () => {
        return await request(app)
            .post("/api/example/families")        
            .send(newFamily)
            .expect(400)
           
    });
});

describe("POST /api/example/families", () => {
    const newFamily = {
        name:"aquest nom de familia es massa llarg i dona un super error"    
    }

    test("Hauria de retornar error al crear una família amb nom massa llarg", async () => {
        return await request(app)
            .post("/api/example/families")        
            .send(newFamily)
            .expect(400)
           
    });
});


describe("PUT /api/example/families/:id", () => {
    const updateFamily = {
        name:"TEST-CANVIAT"    
    }

    test("Hauria d'actualitzar una família", async () => {
        const res = await request(app)          
            .put(`/api/example/families/${family.id}`)
            .send(updateFamily);          
        
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("TEST-CANVIAT")
    });    
});

describe("PUT /api/example/families/:id", () => {
    const updateFamily = {
        name:""    
    }

    test("Hauria de retornar error a l'actualitzar una família al posar el nom en blanc", async () => {
        const res = await request(app)          
            .put(`/api/example/families/${family.id}`)
            .send(updateFamily);          
        
        expect(res.statusCode).toBe(400);
       
    });    
});

describe("DELETE /api/example/families/:id", () => {
    test("Hauria d'esborrar una família", async () => {
        return await request(app)
            .delete(`/api/example/families/${family.id}`)          
            .expect(200)            
    });
});

describe("DELETE /api/example/families/:id", () => {
    test("Hauria de retornar error a l'esborrar una família que no existeix", async () => {
        return await request(app)
            .delete(`/api/example/families/${family.id}`)          
            .expect(404)            
    });
});

