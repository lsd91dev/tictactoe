 // config api
 const app = require('express')();
 const bodyParser = require('body-parser');
 const express = require('express');

 // config environments
 require('dotenv').config({ path: './environments/.env' });

 // config cors
 const cors = require('cors');
 app.use(cors());
 // config paths
 const path = require('path');

 app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
 app.use('/css', express.static(path.join(__dirname, process.env.PATH_BOOTSTRAP_CSS)));
 app.use('/js', express.static(path.join(__dirname, process.env.PATH_BOOTSTRAP_JS)))
 app.use('/js', express.static(path.join(__dirname, process.env.PATH_JQUERY)))


 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json())

 // config routes

 app.use('/new', require('./controllers/new.controller'));
 app.use('/search', require('./controllers/search.room.controller'));

 const server = require('http').createServer(app);

 const io = require('socket.io')(server);

 module.exports = { io };

 require('./sockets/socket');

 server.listen(process.env.PORT, (error) => {
     if (error) { console.log(error); }
     console.log('Server up');
 })