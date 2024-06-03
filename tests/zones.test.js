const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Zone = require("../models/zone");
const Building = require("../models/building");


require("dotenv").config();

let zone = null;
let building = null; 

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    building = new Building({
        name: "building",
        adress: "zaza"
    });

    await building.save();

    zone = new Zone({
        name: "zona de prova",
        building: building._id, 
        blueprint: "example blueprint"
    });

    await zone.save();
});


afterAll(async () => {  
  await mongoose.connection.close();
});


describe("GET /api/zones", () => {
    test("Hauria de retornar el llistat de totes les zones", async () => {
        return await request(app)
            .get("/api/zones")    
            .expect(200)
    });
});



describe("GET /api/zones/:id", () => {
    test('Hauria de retornar una zona', async () => {
        return await request(app)
            .get(`/api/zones/${zone.id}`)          
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.name).toEqual("zona de prova")        
              })
            
    });
})

describe("POST /api/zones", () => {
    

    test("Hauria de crear una zona", async () => {
        const newZone = {
            name: "TEST",
            building: building._id, 
            blueprint: "example blueprint2"
        };


        return await request(app)
            .post("/api/zones")
            .send(newZone)
            .expect(201) 
            .then(async ({ body }) => {
                expect(body.name).toEqual("TEST");
                await Zone.findByIdAndDelete(body.id);
            });
    });
});


describe("POST /api/zones", () => {
    test("Hauria de retornar error al crear una zona amb nom en blanc", async () => {

        const newZone = {
            name: "",
            building: building._id, 
            blueprint: "example blueprint2"
        };

        return await request(app)
            .post("/api/zones")        
            .send(newZone)
            .expect(400)
           
    });
});



describe("POST /api/zones", () => {

    test("Hauria de retornar error al crear una zona i no passar-li el nom", async () => {

        const newZone = {
            name: "", 
            building: building._id, 
            blueprint: "example blueprint2"
        };

        return await request(app)
            .post("/api/zones")        
            .send(newZone)
            .expect(400)
    });
});

describe("POST /api/zones", () => {

    test("Hauria de retornar error al crear una zona amb nom massa llarg", async () => {

        const newZone = {
            name: "aquest nom de la zona es massa llarg i dona un super error", 
            building: building._id, 
            blueprint: "example blueprint2"
        };

        return await request(app)
            .post("/api/zones")        
            .send(newZone)
            .expect(400)
    });
});

//PUTS

describe("PUT /api/zones/:id", () => {


    test("Hauria de retornar error a l'actualitzar una zona al posar el nom en blanc", async () => {

        const updateZone = {
            name: "", 
            building: building._id, 
            blueprint: "example blueprint2"
        };

        const res = await request(app)          
            .put(`/api/zones/${zone.id}`)
            .send(updateZone);          
        
        expect(res.statusCode).toBe(400);
    });    
});


describe("PUT /api/zones/:id", () => {

    test("Hauria d'actualitzar una zona", async () => {

        const updateZone = {
            name:"TEST-CANVIAT",
            building: building._id,
            blueprint: "example blueprint2"
        }

        const res = await request(app)          
            .put(`/api/zones/${zone.id}`)
            .send(updateZone);          
            console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("TEST-CANVIAT")
        
    });    
});

 

//DELETES

describe("DELETE /api/zones/:id", () => {
    test("Hauria d'esborrar una zona", async () => {
        return await request(app)
            .delete(`/api/zones/${zone.id}`)          
            .expect(200)            
    });
});

describe("DELETE /api/zones/:id", () => {
    test("Hauria de retornar error a l'esborrar una zona que no existeix", async () => {
        return await request(app)
            .delete(`/api/zones/${zone.id}`)          
            .expect(404)            
    });

    
});

