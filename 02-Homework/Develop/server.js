var express = require("express");


var app = express();


// If/else...first is checking the server this app is posted on
var PORT = process.env.PORT || 8070

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Exposing the public folder to the browser
// Browser can't see unless its been given permission like it is here
app.use(express.static("public"));

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app);


app.listen(PORT, function(){
    console.log("App is listening on PORT: " + PORT);
});