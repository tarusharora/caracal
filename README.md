# Caracal. 
## Node.js based API
This API is based on `express` and `mongodb` . Swagger is being used to for API documentation and validation.

It makes use of JSON config-maps with an opinionated architecture.

`app.js` Responsible for app bootstrap. This file first loads the configuration from config-map using `configurationAdaptor.js`. Once config is loaded, it makes the connection with database. After that, it actually starts the server.

`server.js` contains the code for server initiation. It exposes a function which actually starts the servers and make it listen on the specified port. It also contains the necessary middlewares. required for processing the requests.

## Folder Structure

- **api**
	- **adaptors** -> responsible for creating connections to external APIs and Databases
	- **controllers** -> responsible the handling the request/response after the validation
	- **db**-> responsible to starting the db, initializing the schemas
	- **helpers** -> helper functions for data manipulation (called mostly by controller)
	- **models** -> models and schema files for entities
	- **swagger** ->  swagger API documentation and validation  
	- **utils** -> wrapper for utilities like http-client, momentjs,  jwt, crypto, etc.
	
- **config**
	- **config.js** -> file to basic config info like app-name, port, etc.
	- **configurationAdaptor** -> file to load and parse the config map
	- **appSettings.json** -> JSON config-map
	
- **app.js** - app bootstrap (load config map, start db, start server) 
- **server.js** - server specific code, middleware, etc.