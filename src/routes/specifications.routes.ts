import { Router } from "express";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCase/createSpecification/CreateSpecificationController";

const specificationRoutes = Router();
specificationRoutes.use(ensureAuthenticated);

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post("/", createSpecificationController.handle);
export { specificationRoutes };
