// load the things we need
var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const axios = require('axios');


var key = "AIzaSyBEfweQPH5xLPJubo2AJrjEODRuw8L18EA";
app.use(bodyParser.urlencoded({extended: true}));
// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

// about page
app.post('/book-details', function(req, res) {

    let bookName = req.body.data;
    let result;
    bookName = encodeURIComponent(bookName.trim())
    axios.get('https://www.googleapis.com/books/v1/volumes?key='+key+'&q='+bookName)
  .then(function (response) {
    // handle success
   console.log(response.data);
   result = response.data;
   res.json({data: result});
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
});
app.listen(8080, function () {
    console.log(`Listening on port 8080`);
});