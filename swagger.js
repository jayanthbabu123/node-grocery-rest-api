const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    definitions: {
        
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];  // Path to the file that contains your endpoints

swaggerAutogen(outputFile, endpointsFiles, doc);
