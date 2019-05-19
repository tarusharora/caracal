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

## Steps to start the server

 - Start the mongodb server
- Put the mongodb uri in '../config/appSettings.json'
 - Run the server using the following command
      - `APP_SETTINGS_FILE_PATH="<<path to appSettings.json>>" node app.js`
      - Please provide a valid path in above line depending on the operating system. 
      - for example: C:\Users\xyz\caracal\config\appSettings.json
      - APP_SETTINGS_FILE_PATH is an environment variable which holds the path to our config map.
   
- If you use VS Code, you can directly launch the program from Debug window (launch config already pushed)

## API Documentation


  To view the the API documentation, 
  Open the **api-documentation.html** present in the root directory of the app.
 This file is pushed just for reference. It should not be present like this ideally
 OR
just copy the contents of swagger.yaml to editor.swagger.io

## Why Swagger?
Swagger is mainly used for API contract, documentation, and basic validation. 

## Next steps
- Use of robust api validation libraries like `joi`for complex validation
- Logging of each incoming/outgoing request and response with timings
      -  Incoming Request to Node Server
      - Outgoing Request to DB/Third party API
      - Incoming Response from DB/Third party API
      - Outgoing Response from Node server
 - Dockerizing the app
 - Deployment to any cloud provider
 
 ## Sample Data
 exported data of categories and products 
 https://gist.github.com/tarusharora/7a9c587e7a27ec0172db0665c4948271
 https://gist.github.com/tarusharora/6e319139ca72aa02a65c9458f3ba263b

## Postman Collection
https://www.getpostman.com/collections/464db8ed748bae47fdec
Note: this postman collection is only applicable for above-mentioned sample dataset as it contains some hardcoded objectids.
