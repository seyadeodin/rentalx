import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/acccounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/acccounts/useCases/updateUserAvatar/UpdateUserAvatarcontroller";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", createUserController.handle);

userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { userRoutes };
