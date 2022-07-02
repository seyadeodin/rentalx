import { Router } from "express";

import { CreateUserController } from "../modules/acccounts/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
