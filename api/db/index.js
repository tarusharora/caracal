const mongoose = require('mongoose');

const connectMongo = (mongoURI) => {
  mongoose.connect(mongoURI, { useNewUrlParser: true });
  mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit();
  });
};


module.exports = {
  connectMongo,
};
