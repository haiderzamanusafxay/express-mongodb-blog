require("dotenv").config();
const port = process.env.PORT || 8000;
const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./src/routes/index.routes");

const connectDB = require("./src/config/db.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["POST", "GET", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
connectDB();
router(app);

app.listen(port, () => {
  console.log(
    `You can listen to your app here at http://localhost:${port}/api`
  );
});
