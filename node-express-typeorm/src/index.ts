import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import cors from "cors";

import authRouter from "./routes/auth.routes";
import appRoutes from './routes/application.routes'
import test from "./routes/test.routes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api', appRoutes)
app.use('/api', test)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
