import { Router } from "express";

import { AuthenticateUserController } from "../modules/acccounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticiateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticiateUserController.handle);

export { authenticateRoutes };
