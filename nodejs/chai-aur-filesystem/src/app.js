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


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file)

  ApiResponse.ok(res, "file uploaded")
});



app.use("/api/auth", authRoute);
app.use("/api/owners", ownerRoutes)

app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

app.use(errorHandler);

export default app;
