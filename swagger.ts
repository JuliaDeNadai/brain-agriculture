import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Brain Agriculture'
    },
    servers: [
        {
            url: 'https://trmbsykipiai4zg4plt4stqqf40igqlx.lambda-url.sa-east-1.on.aws',
            description: 'Production'
        },
        {
            url: 'http://localhost:3000',
            description: 'local'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/endpoints/index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);