//Express includes middleware, cors is middleware

import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import sequelize from "./dbConfig.js";

//create express app
const app = express();
//initiating router feature and adding it to express app
const router = express.Router();
app.use(router);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

const eraseDatabaseOnSync = true;

//listening to local host 5000

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("Server is running on " + port + "port");
  });
});

//creating a /users route

app.use("/users", userRoutes);

export default app;
