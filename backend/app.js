const express = require('express');
const mongoose = require('mongoose');
const auth_router = require('./authRouter');
const machine_router = require('./machineRouter');
const lecture_router = require('./lectureRouter');
const vocation_router = require('./vocationRouter');
const task_router = require('./taskRouter');
const connection = require("./db");

const cors = require("cors");

const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();
// database connection
connection();

const cors_options =  {
    origin: '*',
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204 || 200,
  };


  // Serve static files from the React app




  

app.use(cors(cors_options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth_router);
app.use("/api/machine", machine_router);
app.use("/api/lecture", lecture_router);
app.use("/api/vocation", vocation_router);
app.use("/api/task", task_router);


app.use(express.static(path.join(__dirname, '../frontend/build/')));
// // Handle any requests that don't match an API route
app.get('/*', (req, res) => {
     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

//const indexHtmlPath = path.join(__dirname, '../frontend/build', 'index.html');

//console.log("path=", indexHtmlPath);

app.get('*', (req, res) => {
  res.sendFile(indexHtmlPath);
});

app.listen(PORT, () => {
  console.log(`Server is started on port ${PORT}`);
});
