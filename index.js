var request = require('request');
var express = require('express');
require('dotenv').config()
let app = express()
var layouts = require('express-ejs-layouts');
const port = 3000

app.set('view engine', 'ejs');

// Include any middleware here
app.use(layouts);
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	var qs = {
	  s: 'star wars',
	  apikey: process.env.OMDB_API_KEY
	};
  
	request({
	  url: 'http://www.omdbapi.com',
	  qs: qs
	}, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		var dataObj = JSON.parse(body);
		var results = dataObj.Search
		res.render("results", {results: results});
	  }
	});
  });



app.listen(port, () => console.log(`Example app listening on port ${port}!`))