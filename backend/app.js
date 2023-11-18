const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const mongoose = require('mongoose');
const userRoute = require('./routes/route');
mongoose.connect('mongodb://127.0.0.1:27017/iNotebook');
app.use('/', userRoute);
app.use(express.json());
app.listen(3000, () => {
    console.log('Listening at port 3000')
});