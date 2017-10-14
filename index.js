const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
//app.set('view engine', 'ejs')

app.set('json spaces', 40);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

var db

//TODO: Remove tmp password from the file
MongoClient.connect('mongodb://dev:dev123@ds121015.mlab.com:21015/parkmyway', (err, database) => {
  if (err) return console.log(err)
  db = database
	app.use(bodyParser.urlencoded({extended: true}))
	app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/index.html')

	})

	app.get('/park', (req, res) => {
    let response_json =[{}];
      if(req.query.park_id != null){
        //TODO: send details of the parking spot
        response_json=[{
          "park_id":"asdk13221asdas",
          "lat":33.777561399999996,
          "long":84.3961295,
          "available":true,
          "time_stamp":"2017-10-14T02:06:32-04:00",
          "size":"XL",
          "price":12,
        }]
      }
      else {
        console.log(req.query.lat);
        console.log(req.query.long);
        console.log(req.query.radius);
        let lat=req.query.lat;
        let long=req.query.long;
        let radius=req.query.radius;
        // TODO: Return a list of park locations within 1 mile radius Limit to 10
        // db.collection('park').find().toArray(function(err, results) {
        // // send HTML file populated with quotes here
        //  res.render('viewusers.ejs', {users: results})
        // })
        response_json=[
          {
            "park_id":"asdk13221asdas",
            "lat":33.777561399999996,
            "long":84.3961295,
            "available":true,
            "time_stamp":"2017-10-14T02:06:32-04:00",
            "size":"XL",
            "price":12,
          },
          {
            "park_id":"asdq1321ewq123d",
            "lat":33.777461399999996,
            "long":84.3961295,
            "available":true,
            "time_stamp":"2017-10-14T02:06:32-04:00",
            "size":"L",
            "price":9,
          },
        ];
      }
    res.send(response_json);
});


	app.post('/park', (req, res) => {
    // console.log(req.body);

	 db.collection('users').save(req.body, (err, result) => {
	    if (err){
        console.log(err);
      }
	    console.log('saved to database')
	  })
    res.json({
      "status":"Message Sent"
    })
	})


  app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});
})
