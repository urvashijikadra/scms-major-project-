const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
const studentRoutes = require('./routes/student.routes');
app.use('/students', studentRoutes);

// DB
mongoose.connect('mongodb://127.0.0.1:27017/scms')
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(err));

app.listen(3000, ()=> console.log("Server running on 3000"));