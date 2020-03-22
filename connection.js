const mongoose = require('mongoose');

const {
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_USER,
    MONGO_PASSWORD
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};
.

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, options, err => {
  if (err) {
    console.log(err)
  }
  console.log("Connected !")
});
