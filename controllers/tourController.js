const fs = require("fs");

const tourData = fs.readFileSync(
  "/Users/adityapratapsingh/backend/myexpress/dev-data/data/tours-simple.json",
  "utf-8"
);
const tour_json = JSON.parse(tourData);

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

module.exports = {
  addTour,
  updateTour,
  getTourById,
  getTour,
};
