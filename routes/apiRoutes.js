var path = require("path");
const uuidv1 = require('uuid/v1')

// Here you require the data from the file that has it
// var noteData = require("../db/db.json");
var fs = require("fs");
      
// this directory (dirname__) and te file db.json combine in line 14
const filePath = path.join(__dirname, "../db/db.json");

const randomId = uuidv1;

        // Use fs.readFile() method to read the file 
        // fs is used to read the db.json file and return it's data
        function readAndParse(pigeon) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        // Display the file content 
        // We want to parse the data because fs sends back stringified JSON and thats not usable
        const parseData = JSON.parse(data)
        pigeon(parseData)
    });
    
}



module.exports = function (app) {


    app.get("/api/notes", function (req, res) {

        readAndParse(function(parseData){
            console.log(parseData)
            // This is the data we are serving to the user
            res.json(parseData)

        });
        
        
    })

    app.post('/api/notes', function(req, res){
        console.log(req.body);
        
        const newNote = req.body;
        
        // Creates a random id for each new note
        newNote.id = randomId();

        readAndParse(function(parseData){
            // parseData is eveything in the db.json file
            console.log(parseData)
            
            // parseData is the array within db.json
            parseData.push(newNote);
            
            JSON.stringify(parseData);

            const stringedData = JSON.stringify(parseData);

            fs.writeFile(filePath, stringedData, err => {
                if (err) {
                  res.json(err);
                  return
                }
                // This is how you return data with a route handler function
                // The request gets this response
                res.json(newNote);
            })

        });
    })


    // https://expressjs.com/en/guide/routing.html#route-parameters
    app.delete("api/notes/:id", function(req, res) {


        const deletePreciousObject = req.params.id

    })


}

