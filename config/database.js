module.exports = (uri) => {
  const mongoose = require('mongoose');

  mongoose.connect( uri, { useNewUrlParser: true, useFindAndModify: false } );

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error: ' + err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Application ended, connection closed.');
      process.exit(0);
    });
  });

};