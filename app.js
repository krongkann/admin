const express = require('express');  
const app = express();  
const path = require('path');  
const bodyParser = require('body-parser');
var faker = require('faker');
const _ = require('lodash')
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../node_modules')));
app.use(express.static(__dirname + '/public'));

/**
 * API
 */
app.get('/api', function(req, res, next) {  
    let data = {
        message: 'Hello World!'
    };
    res.status(200).send(data);
});
app.post('/api', function(req, res, next) {  
    let data = req.body;
    // query a database and save data
    res.status(200).send(data);
});
app.get('/data', (req, res)=>{
  var faker = require('faker');
  var data = []

  for(let i=0 ; i <= 10 ;i++ ){
    var obj = _.extend({},{
      name: faker.fake("{{name.firstName}}") ,
      progress: faker.random.number()/1000,
      gender: (i%2 == 0)?  "female": "male", 
      rating: i ,
      col: faker.commerce.color() ,
      dob: faker.date.month(),
      car: faker.address.city()
    }
    )
    data[i] =  obj
  }
  res.status(200).send(data)
 
})

/**
 * STATIC FILES
 */

// Default every route except the above to serve the index.html
app.get('/app', function(req, res) { 
    console.log("test");
    
    res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = app;  