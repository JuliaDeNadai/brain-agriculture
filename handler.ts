import AWS from "aws-sdk"
import serverless from "serverless-http"
import {app} from "./src/api/api"

export const handler = serverless(app)