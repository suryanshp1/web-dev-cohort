import express from "express";
import type { Router } from "express";
import AutheticationController from "./controller.js";

export const authRouter: Router = express.Router()

const autheticationController = new AutheticationController()

authRouter.post("/sign-up", autheticationController.handleSignup.bind(autheticationController))

authRouter.post("/sign-in", autheticationController.handleSignin.bind(autheticationController))