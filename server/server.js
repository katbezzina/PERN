//Express includes middleware, cors is middleware

import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import postmodelRoutes from "./routes/postmodelRoutes.js";
import addpostRoutes from "./routes/addpostRoutes.js";
// import sequelize from "./dbConfig.js";

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
//to be changed in production
app.use(cors());
// const eraseDatabaseOnSync = true;
// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});
// });

////CREATING ROUTES in folder

//users
app.use("/users", userRoutes);

//posts
app.use("/posts", postRoutes);
app.use("/posts", postmodelRoutes);
app.use("/posts", addpostRoutes);

export default app;
