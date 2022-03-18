const express = require("express");
const fs = require("fs");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
const tourData = fs.readFileSync("./dev-data/data/tours-simple.json", "utf-8");
const tour_json = JSON.parse(tourData);
// Code For Creating Middleware
// const midleWare = (req, res, next) => {
//   console.log("Inside Custom midleware 🥹");
//   next();
// };
// app.use(midleWare);

const getTour = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: tour_json.length,
    data: { tours: tour_json },
  });
};

const getTourById = (req, res) => {
  if (req.params.id >= tour_json.length) {
    res.status(404).json({
      status: "Failed",
      message: "Given Id Not Found !!",
    });
  } else {
    const id_data = tour_json[req.params.id];
    res.status(200).json({
      status: "Success",
      data: id_data,
    });
  }
};

const updateTour = (req, res) => {
  if (req.params.id >= tour_json.length) {
    res.status(404).json({
      status: "Failed",
      message: "Given Id Not Found !!",
    });
  } else {
    const oldData = tour_json.find((el) => el.id === req.params.id * 1);
    const id_data = { ...oldData, ...req.body };
    tour_json[req.params.id] = id_data;
    res.status(200).json({
      status: "Success",
      data: id_data,
    });
  }
};

const addTour = (req, res) => {
  // Get the last id
  const lastId = tour_json[tour_json.length - 1].id + 1;
  const data = { ...{ id: lastId }, ...req.body };
  tour_json.push(data);
  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tour_json),
    (err) => {
      if (err) {
        res.status(400).json({ status: "Error writing files" });
      } else {
        res.status(201).json({
          status: "Success",
          data: tour_json,
        });
      }
    }
  );
};
app.route("/api/v1/tour").get(getTour).post(addTour);
app.route("/api/v1/tour/:id").get(getTourById).patch(updateTour);
// app.get("/api/v1/tour", getTour);
// app.post("/api/v1/tour", addTour);
// app.get("/api/v1/tour/:id", getTourById);
// app.patch("/api/v1/tour/:id", updateTour);

// Code for running the server
const port = 4000;
app.listen(port, () => console.log(`App running on ${port}`));
