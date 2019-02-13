'use strict';


module.exports = (mongoose, config) => {
  const database = mongoose.connection;
  mongoose.Promise = Promise;

  mongoose.connect(config.databaseURL, {
    promiseLibrary: global.Promise,
    useCreateIndex: true,
    useNewUrlParser: true
  });

  database.on('error', error => console.log(`Connection to TimeManager database failed: ${error}`));
  database.on('connected', () => console.log('Connected to TimeManager database'));
  database.on('disconnected', () => console.log('Disconnected from TimeManager database'));

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('TimeManager terminated, connection closed');
      process.exit(0);
    })
  });
};