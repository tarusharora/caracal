
const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();

const { port } = require('./config/config');

const config = {
  appRoot: __dirname, // required config
};

const createServer = () => SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  app.use((err, req, res, next) => {
    // Do logging and user-friendly error message display
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  });

  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/?name=World`);
  }
});

module.exports.createServer = createServer;
