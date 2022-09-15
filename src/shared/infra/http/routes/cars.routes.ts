import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpeciification/CreateCarSpecificationController";
import { ListAvailablCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvilableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCase/uploadCarImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailablCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/", listAvailableCarsController.handle);

carRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carRoutes };
