import { Context, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';

import {app} from "./src/api/api"

const server = createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
  return new Promise((resolve, reject) => {
    try {
      proxy(server, event, context);
    } catch (error) {
      reject(error);
    }
  });
};