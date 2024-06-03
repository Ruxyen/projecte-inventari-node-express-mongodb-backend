const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Role = require("../models/role");

require("dotenv").config();

let role = null;

/* Conexión a la base de datos antes de todas las pruebas. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    role = new Role();
    role.name = "rol de prova";
    await role.save();
});

/* Eliminación de la base de datos y cierre de la conexión después de todas las pruebas. */
afterAll(async () => {  
    await mongoose.connection.close();
});

describe("GET /api/roles", () => {
    test("Hauria de retornar el llistat de rols", async () => {
        return await request(app)
            .get("/api/roles")
            .expect(200);
    });
});

describe("GET /api/roles/:id", () => {
    test('Hauria de tornar un rol', async () => {
        return await request(app)
            .get(`/api/roles/${role._id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.name).toEqual("rol de prova");        
            });
    });
});

describe("POST /api/roles", () => {
    const newRole = {
        name: "TEST"    
    }

    test("Hauria de crear un rol", async () => {
        const res = await request(app)
            .post("/api/roles")
            .send(newRole)
            .expect(201);

        expect(res.body.name).toEqual("TEST");
        await Role.findByIdAndDelete(res.body._id); // Eliminar el rol creado
    });
});

describe("POST /api/roles", () => {
    const newRole = {
        nameNO: ""    
    }

    test("Hauria de retornar error en crear un rol sense proporcionar un nom", async () => {
        return await request(app)
            .post("/api/roles")
            .send(newRole)
            .expect(400);
    });
});

describe("POST /api/roles", () => {
    const newRole = {
        name: ""    
    }

    test("Hauria de tornar error en crear un rol amb número en blanc", async () => {
        return await request(app)
            .post("/api/roles")
            .send(newRole)
            .expect(400);
    });
});

describe("POST /api/roles", () => {
    const newRole = {
        name: "aquest nom de familia es massa llarg i dona un super error"    
    }

    test("Hauria de retornar error en crear un rol amb un nom massa llarg", async () => {
        return await request(app)
            .post("/api/roles")
            .send(newRole)
            .expect(400);
    });
});

describe("PUT /api/roles/:id", () => {
    const updateRole = {
        name: "TEST-CANVIAT"    
    }

    test("Hauria d'actualitzar un rol", async () => {
        const res = await request(app)          
            .put(`/api/roles/${role._id}`)
            .send(updateRole);          
        
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("TEST-CANVIAT");
    });    
});

describe("PUT /api/roles/:id", () => {
    const updateRole = {
        name: ""    
    }

    test("Hauria de retornar error en intentar actualitzar un rol deixant el nom en blanc", async () => {
        const res = await request(app)          
            .put(`/api/roles/${role._id}`)
            .send(updateRole);          
        
        expect(res.statusCode).toBe(400);
    });    
});

describe("DELETE /api/roles/:id", () => {
    test("Hauria d'eliminar un rol", async () => {
        return await request(app)
            .delete(`/api/roles/${role._id}`)          
            .expect(200);
    });
});

describe("DELETE /api/roles/:id", () => {
    test("Hauria de tornar error en intentar eliminar un rol que no existeix", async () => {
        return await request(app)
            .delete(`/api/roles/${role._id}`)          
            .expect(404);
    });
});
