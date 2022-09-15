import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCase/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationRoutes = Router();
specificationRoutes.use(ensureAuthenticated);
specificationRoutes.use(ensureAdmin);
// other form of use middlewares

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);
export { specificationRoutes };
