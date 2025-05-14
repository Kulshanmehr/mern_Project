import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRouter from "../routes/user.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form-encoded data
app.use(express.static("public"));
app.use(cookieParser());

// Routes Declaration

app.use("/api/v1/users", UserRouter);

export { app };
