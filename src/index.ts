import express, { ErrorRequestHandler } from "express";
import swaggerUi from 'swagger-ui-express'

import swaggerFile from '../swagger.json'
import { EmailAlreadyExistsError } from "./modules/users/useCases/Errors/EmailAlreadyExistsError";
import { usersRoutes } from "./routes/users.routes";

const app = express();



app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/users", usersRoutes);



const errorHandler: ErrorRequestHandler = async (err, request, response, next) => {
  console.error(err);


  if (err instanceof EmailAlreadyExistsError) {
    return response.status(400).json({ error: err.message });
  }
  if (err.message === 'User Already Exists') {
    return response.status(400).json({ error: err.message })
  }
  if (err.message === 'User does not exist') {
    return response.status(400).json({ error: err.message })
  }
  return response.status(500).json({ error: 'Internal Server Error' });

}

app.use(errorHandler)

export { app };
