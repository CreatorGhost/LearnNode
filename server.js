const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
console.log(process.env.PORT);

// We are have to require app after getting the environments variable so that it can we access throughout the app
const app = require("./index");
// Code for running the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App running on ${port}`));
