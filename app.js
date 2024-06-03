const express = require("express");

var cors = require('cors');
var path = require('path');

// Per generar la documentació de la API
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
const {options} = require("./docs/configure.js")


// Rutes d'exemple
var familyRouter = require('./routes/example/families.router');
var cfRouter = require('./routes/example/cfs.router');

// Rutes diferents mòduls del projecte
// Mòdul 1
var zoneRouter = require('./routes/zones.router');
var buildingRouter = require('./routes/buildings.router');
var locationRouter = require('./routes/locations.router');
// Mòdul 2
const actionRouter = require('./routes/action.router.js');
var roleRouter = require('./routes/roles.router.js');
var userRouter = require('./routes/users.router.js');
// Mòdul 3
var categoryRouter = require('./routes/categories.router');
var materialRouter = require('./routes/materials.router');
const stockRouter = require('./routes/stocks.router');

// Mòdul 4
var incidentRouter = require('./routes/incident.router');


// Auth
var authRouter = require('./routes/auth.router');

const app = express();


  // localhost:8080/api-docs
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req,res) => {
    return res.status(200).json({"API Server":"OK"})
})

//  URLs d'exemple
app.use('/api/example/families', familyRouter);
app.use('/api/example/cfs', cfRouter);

//  URLs Mòdul 1
app.use('/api/zones', zoneRouter);
app.use('/api/buildings', buildingRouter);
app.use('/api/locations', locationRouter);
//  URLs Mòdul 2
app.use('/api/actions', actionRouter);
app.use('/api/roles', roleRouter);
app.use('/api/users', userRouter);
//  URLs Mòdul 3
app.use('/api/categories', categoryRouter);
app.use('/api/materials', materialRouter);
app.use('/api/stocks', stockRouter);

app.use('/api/auth', authRouter);

//  URLs Mòdul 3
app.use('/api/incidents', incidentRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;

