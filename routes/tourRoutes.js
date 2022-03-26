const express = require("express");
const tourController = require("../controllers/tourController");

// Creating a sub router for specific use case

const router = express.Router(); // Initializing the router as a "Middleware"
//app.use("/api/v1/tour", router); // Setting the rout to the default url for all tour related queries

router.route("/").get(tourController.getTour).post(tourController.addTour);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTour);

module.exports = router;
