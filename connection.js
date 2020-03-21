const mongoose = require('mongoose');

const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DB,
    MONGO_USER,
    MONGO_PASSWORD
} = process.env;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, err => {
  if (err) {
    console.log(err)
  }
  console.log("Connected !")
});