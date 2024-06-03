const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Location = require("../models/location");
const Building = require("../models/building");
const Zone = require("../models/zone");

require("dotenv").config();

let location = null;
let zone = null;

/* Connecting to the database before all test. */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  //building
  const building = new Building();
  building.name = "Edifici 1";
  await building.save();

  //zone
  zone = new Zone();
  zone.name = "Zona 1";
  zone.blueprint = "Planta 1";
  zone.building = building._id;
  await zone.save();
  console.log(zone);

  //location
  location = new Location();
  location.name = "prova";
  location.is_bookable = true;
  location.zone = zone._id;
  await location.save();
});

/* Dropping the database and closing connection after all test. */
afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api/locations", () => {
  test("Hauria de retornar el llistat de totes els locations", async () => {
    return await request(app).get("/api/locations").expect(200);
  });
});

describe("GET /api/locations/:id", () => {
  test("Hauria de retornar un location", async () => {
    return await request(app)
      .get(`/api/locations/${location.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .expect((response) => {
        expect(response.body.name).toEqual("prova");
        expect(response.body.is_bookable).toEqual(true);
      });
  });
});

describe("POST /api/locations", () => {
  test("Hauria de crear un location", async () => {
    const newLocation = {
      name: "TEST",
      is_bookable: false,
      zone: zone._id,
    };

    console.log(newLocation);
    return await request(app)
      .post("/api/locations")
      .send(newLocation)
      .expect(200)
      .then(async ({ body }) => {
        expect(body.name).toEqual("TEST");
        expect(body.is_bookable).toEqual(false);
        console.log(body._id);
        await Location.findByIdAndDelete(body._id);
      });
  });
});

describe("POST /api/locations", () => {
  
  test("Hauria de retornar error al crear un location i no passar-li el nom", async () => {
    const newLocation = {
      name: "",
      
    };

    return await request(app)
      .post("/api/locations")
      .send(newLocation)
      .expect(400);
  });
});

describe("POST /api/locations", () => {
  test("Hauria de retornar error al crear un location amb nom en blanc", async () => {
    const newLocation = {
      name: "",
      is_bookable: false,
      zone: zone._id,
    };
    return await request(app)
      .post("/api/locations")
      .send(newLocation)
      .expect(400);
  });
});

describe("POST /api/locations", () => {
  

  test("Hauria de retornar error al crear un location amb nom massa llarg", async () => {
    const newLocation = {
      name: "aquest nom de location es massa llarg i dona un super error",
      is_bookable: false,
      zone: zone._id,
    };
    return await request(app)
      .post("/api/locations")
      .send(newLocation)
      .expect(400);
  });
});

describe("PUT /api/locations/:id", () => {
  test("Hauria d'actualitzar un location", async () => {
    const updateLocation = {
      name: "TEST-CANVIAT",
      is_bookable: true,
      zone: zone._id,
    };
    const res = await request(app)
      .put(`/api/locations/${location.id}`)
      .send(updateLocation);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("TEST-CANVIAT");
    expect(res.body.is_bookable).toBe(true);
  });
});

describe("PUT /api/locations/:id", () => {
  test("Hauria de retornar error a l'actualitzar un location al posar el nom en blanc", async () => {
    const updateLocation = {
      name: "",
      is_bookable: true,
      zone: zone._id,
    };
    const res = await request(app)
      .put(`/api/locations/${location.id}`)
      .send(updateLocation);

    expect(res.statusCode).toBe(400);
  });
});

describe("DELETE /api/locations/:id", () => {
  test("Hauria d'esborrar un location", async () => {
    return await request(app)
      .delete(`/api/locations/${location.id}`)
      .expect(200);
  });
});

describe("DELETE /api/locations/:id", () => {
  test("Hauria de retornar error a l'esborrar un location que no existeix", async () => {
    return await request(app)
      .delete(`/api/locations/${location.id}`)
      .expect(404);
  });
});
