import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://admin:Mongo2025@cluster0.1dbxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5001;

// Connect to the MongoDB database and start the server
mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: ${PORT}, http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

// Handle EADDRINUSE error
app.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  } else {
    throw err;
  }
});