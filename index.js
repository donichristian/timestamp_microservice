// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// Define a route handler for a GET request to "/api/:date?"
app.get("/api/:date?", (req, res) => {
    // Extract the "date" parameter from the request URL
    const { date } = req.params;
    
    // Use a ternary operator to set the "dateObject" variable
    const dateObject = !date
        ? new Date() // If "date" is not provided, use the current date and time
        : !isNaN(date) && Number.isInteger(+date)
            ? new Date(parseInt(date)) // If "date" is a valid integer, parse it and create a Date object
            : new Date(date); // Otherwise, treat "date" as a string and create a Date object
    
    // Check if the "dateObject" is a valid date
    // If it is not valid, send a JSON response with an error message
    // Otherwise, send a JSON response with the Unix timestamp and UTC string representation of the date
    return isNaN(dateObject.getTime())
        ? res.json({ error: "Invalid Date" })
        : res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
