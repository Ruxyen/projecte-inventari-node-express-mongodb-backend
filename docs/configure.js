const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Inventari Ins Vidal i Barraquer API",
        version: "0.1.0",
        description:
          "API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "DAW2",
          url: "http://www.vidalibarraquer.net",
          email: "vidalibarraquer@xtec.cat",
        },
      },
      components: {
        securitySchemes: {
            Authorization: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                value: "Bearer <JWT token here>"
            }
        }
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./routes/*.js","./models/*.js"]
  };

  module.exports = {        
    options
  }