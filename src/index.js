import express from "express";
import { engine } from "express-handlebars";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("src/public"));
app.use(express.json());

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

console.log("dotenv: ", process.env.MONGO_DB);

app.use(function (req, res, next) {
  console.log(process.env.URL);
  // Website you wish to allow to connect
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", process.env.URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect DB success");
  })
  .catch((error) => {
    console.log("error: ", error);
  });

routes(app);

app.listen(port, () => {
  console.log("Sever is running in port: ", port);
});
