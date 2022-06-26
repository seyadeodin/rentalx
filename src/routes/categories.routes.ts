import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCase/createCategory";
import importCategoryController from "../modules/cars/useCase/importCategory";
import listCategoriesController from "../modules/cars/useCase/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };

// if you have a class S and this class is a T subtype so all T objects may be substited by S
// without needing to change the properties of its program
// contracts(interfaces) over classes
