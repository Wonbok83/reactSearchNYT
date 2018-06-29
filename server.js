// Web Scraper Homework Solution Example
// (be sure to watch the video to see
// how to operate the site in the browser)
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// Require our dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");

// Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3001;

// Instantiate our Express App
var app = express();

// Use bodyParser in our app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))
}

// Routing
var articlesController = require("./server/controllers/article-controller");
var router = new express.Router();
// Define any API routes first
// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});



// Have every request go through our route middleware
app.use(router);





// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nyt-react";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log(`Listening on port:  ${PORT}`);
});
