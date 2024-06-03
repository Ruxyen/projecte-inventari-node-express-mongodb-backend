const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 6000;


/* Connecting to the database and then starting the server. */
mongoose
  .connect(process.env.MONGODB_URI)  
  .then(() => {
       app.listen(PORT, console.log("Server started on port "+ PORT));
  })
  .catch((err) => {
    console.log(err);
});