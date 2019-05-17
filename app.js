const nconf = require('nconf');

const server = require('./server');
const db = require('./api/db');
const { appSettingsFilePath } = require('./config/config');
const { loadSettings } = require('./config/configurationAdaptor');

const startupProcess = () => new Promise((resolve) => {
  const mongoURI = nconf.get('db.mongodb.uri');
  db.connectMongo(mongoURI);
  resolve();
});


loadSettings({ appSettingsPath: appSettingsFilePath })
  .then(startupProcess)
  .then(() => {
    server.createServer();
  })
  .catch((err) => {
    // console.error(err);
    throw err;
  });
