import { Router } from "express";

import { authenticateRoutes } from "./authentication.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", userRoutes);
router.use("/cars", carRoutes);
router.use("/rentals", rentalsRoutes);
router.use(authenticateRoutes);

export { router };
