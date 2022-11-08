import cors from "cors";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

import router from "./routes/users.js";

app.use("/users", router);
