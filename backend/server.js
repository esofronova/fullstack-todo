const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();
const PORT = process.env.PORT;
const routes = require('./routes/handler');

mongoose.connect(
   process.env.MONGO_TODO,
   { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
   () => {
      console.log("Connected to MongoDB");
   }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));