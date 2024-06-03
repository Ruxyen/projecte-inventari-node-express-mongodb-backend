const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Action = require("../models/actions");

require("dotenv").config();

let action = null;

/* Conexión a la base de datos antes de todas las pruebas. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    action = new Action({
        name: "test_action",
        functionality: "test_functionality"
    });
    await action.save();
});

/* Eliminación de la base de datos y cierre de la conexión después de todas las pruebas. */
afterAll(async () => {  
    await mongoose.connection.close();
});

/* Limpieza de la base de datos después de cada prueba */
afterEach(async () => {
    //await Action.deleteMany({});
});

describe("GET /api/actions", () => {
    test("Debe devolver la lista de todas las acciones", async () => {
        return await request(app)
            .get("/api/actions")    
            .expect(200);
    });
});

describe("GET /api/actions/:id", () => {
    test('Debe devolver una acción', async () => {
        return await request(app)
            .get(`/api/actions/${action._id}`)  
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {               
                expect(response.body.name).toEqual("test_action");        
            });
    });
});


describe("POST /api/actions", () => {
    const newAction = {
        name: "TEST",
        functionality: "TEST_FUNCTIONALITY"
    };

    test("Debe crear una acción", async () => {
        const res = await request(app)
            .post("/api/actions")        
            .send(newAction)
            .expect(200);

        expect(res.body.name).toEqual("TEST");

        // Eliminar la acción creada después de la prueba
        await Action.findByIdAndDelete(res.body._id);
    });

    test("Debe devolver un error al crear una acción sin pasarle el nombre", async () => {
        const newAction = {
            functionality: "TEST_FUNCTIONALITY"
        };

        await request(app)
            .post("/api/actions")        
            .send(newAction)
            .expect(400);
    });

    test("Debe devolver un error al crear una acción con nombre en blanco", async () => {
        const newAction = {
            name: "",
            functionality: "TEST_FUNCTIONALITY"
        };

        await request(app)
            .post("/api/actions")        
            .send(newAction)
            .expect(400);
    });

    


   
});

describe("PUT /api/actions/:id", () => {
    const updateAction = {
        name: "TEST_CHANGED",
        functionality: "TEST_FUNCTIONALITY_CHANGED"
    };

    test("Debe actualizar una acción", async () => {
        const res = await request(app)          
            .put(`/api/actions/${action._id}`)
            .send(updateAction);          
        
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe("TEST_CHANGED");
        expect(res.body.functionality).toBe("TEST_FUNCTIONALITY_CHANGED");
    });    

    test("Debe devolver un error al actualizar una acción al dejar el nombre en blanco", async () => {
        const updateAction = {
            name: ""
        };

        await request(app)          
            .put(`/api/actions/${action._id}`)
            .send(updateAction)
            .expect(400);
    });    

   

});

describe("DELETE /api/actions/:id", () => {
    test("Debe eliminar una acción", async () => {
        const res = await request(app)
            .delete(`/api/actions/${action._id}`)          
            .expect(200);

        expect(res.body.message).toBe("La acción ha sido eliminada exitosamente.");
    });

    test("Debe devolver un error al eliminar una acción que no existe", async () => {
        await request(app)
            .delete(`/api/actions/${action._id}`)          
            .expect(404);
    });

    

});
