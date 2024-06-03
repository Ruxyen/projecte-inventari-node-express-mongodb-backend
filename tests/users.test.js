const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/user');

require('dotenv').config();

let user = null;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
    user = await User.create({ username: "testuser", password: "testpassword", email: "test@example.com" });
});

afterEach(async () => {
    await User.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

const createUser = async (userData) => {
    return await User.create(userData);
};

describe('GET /api/users', () => {
    test('Debería devolver una lista de todos los usuarios', async () => {
        await request(app)
            .get("/api/users")
            .expect(200);
    });
});

describe('GET /api/users/:id', () => {
    test('Debería devolver un usuario por su ID', async () => {
        await request(app)
            .get(`/api/users/${user.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.username).toEqual("testuser");
            });
    });
});

describe('POST /api/users', () => {
    const newUser = { username: "newuser", password: "newpassword", email: "new@example.com" };

    test('Debería crear un nuevo usuario', async () => {
        await request(app)
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .then(async ({ body }) => {
                expect(body.username).toEqual("newuser");
                // Limpieza después de la prueba
                await User.findByIdAndDelete(body.id);
            });
    });

    test("Debería devolver error al crear un usuario sin nombre de usuario", async () => {
        await request(app)
            .post("/api/users")
            .send({ password: "testpassword", email: "test@example.com" })
            .expect(400);
    });

    test("Debería devolver error al crear un usuario sin contraseña", async () => {
        await request(app)
            .post("/api/users")
            .send({ username: "testuser", email: "test@example.com" })
            .expect(400);
    });
});

describe('PUT /api/users/:id', () => {
    const updateUser = { username: "updateduser", password: "updatedpassword", email: "updated@example.com" };

    test("Debería actualizar un usuario por su ID", async () => {
        const res = await request(app)
            .put(`/api/users/${user.id}`)
            .send(updateUser);

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("updateduser");
    });

    test("Debería devolver error al actualizar un usuario que no existe", async () => {
        const res = await request(app)
            .put(`/api/users/invalidID`)
            .send(updateUser);
    
        expect(res.statusCode).toBe(500);
    });
});

describe('DELETE /api/users/:id', () => {
    test("Debería eliminar un usuario por su ID", async () => {
        await request(app)
            .delete(`/api/users/${user.id}`)
            .expect(200);
    });

    test("Debería devolver error al eliminar un usuario que no existe", async () => {
        await request(app)
            .delete(`/api/users/invalidID`)
            .expect(500); // Cambiar el estado esperado a 500
    });
});

