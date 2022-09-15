import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCase/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCase/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCase/listCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
);
export { categoriesRoutes };

// if you have a class S and this class is a T subtype so all T objects may be substited by S
// without needing to change the properties of its program
// contracts(interfaces) over classes
