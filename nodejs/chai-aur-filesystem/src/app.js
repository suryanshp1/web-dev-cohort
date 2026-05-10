import path from "path";
import cookieParser from "cookie-parser";
import express from "express";

import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import errorHandler from "./common/middleware/error.middleware.js";
import ownerRoutes from "./modules/ipl-ms/routes/owner.routes.js"
import multer from "multer";
import ApiResponse from "./common/utils/api-response.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/auth", authRoute);
app.use("/api/owners", ownerRoutes)

app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

app.use(errorHandler);

const upload = multer();

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file)

  ApiResponse.ok(res, "file uploaded")
})

export default app;
