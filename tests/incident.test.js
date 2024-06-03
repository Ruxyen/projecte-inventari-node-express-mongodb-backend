const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Incident = require("../models/incident");

require("dotenv").config();

let incident = null;

/* Conexión a la base de datos antes de todos los tests */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    incident = new Incident({
        priority: 'Alta',
        creation_date: new Date(),
        description: 'Descripción del incidente de prueba',
        resolution: 'Resolución del incidente de prueba',
        type: 'Tipo de incidente de prueba',
        resolution_date: new Date(),
        state: 'Abierto'
    });
    await incident.save();
});

/* Eliminación de la base de datos y cierre de la conexión después de todos los tests */
afterAll(async () => {  
    await Incident.deleteMany({});
    await mongoose.connection.close();
});

// Test para obtener todos los incidentes
describe("GET /api/incidents", () => {
    test("Debería retornar el listado de todos los incidentes", async () => {
        return await request(app)
            .get("/api/incidents")    
            .expect(200);
    });
});

// Test para obtener un incidente específico por su ID
describe("GET /api/incidents/:id", () => {
    test('Debería retornar un incidente específico', async () => {
        return await request(app)
            .get(`/api/incidents/${incident._id}`)          
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.priority).toEqual("Alta");
                expect(response.body.description).toEqual("Descripción del incidente de prueba");
            });
    });
});

// Test para crear un nuevo incidente
describe("POST /api/incidents", () => {
    test("Debería crear un nuevo incidente", async () => {
        const newIncident = {
            priority: 'Baja',
            creation_date: new Date(),
            description: 'Descripción del nuevo incidente',
            resolution: 'Resolución del nuevo incidente',
            type: 'Tipo de nuevo incidente',
            resolution_date: new Date(),
            state: 'Abierto'
        };

        return await request(app)
            .post("/api/incidents")        
            .send(newIncident)
            .expect(201)
            .then(async ({ body }) => {
                expect(body.priority).toEqual("Baja");
                expect(body.description).toEqual("Descripción del nuevo incidente");
                // Eliminamos el incidente creado para mantener la base de datos limpia
                await Incident.findByIdAndDelete(body._id);
            });
    });
});

// Test para actualizar un incidente existente
describe("PUT /api/incidents/:id", () => {
    test("Debería actualizar un incidente existente", async () => {
        const updateIncident = {
            description: "Descripción actualizada"
        };

        const res = await request(app)          
            .put(`/api/incidents/${incident._id}`)
            .send(updateIncident);          
        
        expect(res.statusCode).toBe(200);
        expect(res.body.description).toBe("Descripción actualizada");
    });    
});

// Test para eliminar un incidente existente
describe("DELETE /api/incidents/:id", () => {
    test("Debería eliminar un incidente existente", async () => {
        return await request(app)
            .delete(`/api/incidents/${incident._id}`)          
            .expect(200);
    });
});