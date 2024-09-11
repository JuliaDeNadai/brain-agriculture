import serverless from 'serverless-http'; // Converte o app Express para Lambda handler
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import {app} from "./src/api/api"

// Converte a aplicação Express para funcionar no ambiente Lambda
const handler = serverless(app);

// Função exportada para a Lambda
export const lambdaHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  return handler(event, context);
};