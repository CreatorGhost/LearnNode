const express = require("express");
const morgan = require("morgan");

// Importing Routers from Route Folder
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("In the middleware 😁");
  next();
});

app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/user", userRouter);

// Code for running the server
const port = 4000;
app.listen(port, () => console.log(`App running on ${port}`));
