import { Router } from "express";
import { healthCheck } from "../controllers/heathcheck.controller.js";

const router = Router();

router.route("/").get(healthCheck);

export default router;
