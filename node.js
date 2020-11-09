var express = require('express');
var mongoose = require('mongoose');
var bodyparser =require('body-parser');
var cors = require ('cors');
var path = require ('path');
// const { appendFileSync } = require('fs');

var app = express();

const route = require('./routes/route.js');

//mongoose connection
mongoose.connect('mongodb://localhost:27017/contactlist');
//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in db connection ' + err);

    }
});

const port = 3000;

//adding middleware--cors
app.use(cors());

 //adding body parser
 app.use(bodyparser.json());

 //static files
app.use(express.static(path.join(__dirname, 'public')));

//routes 
app.use('/api',route);

//testing server
 app.get('/',(req,res)=>{
    res.send('ONly node app is running');
});

app.listen(port,()=>{
console.log('server started at port: '+port);
});
