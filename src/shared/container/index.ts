import { container } from "tsyringe";

import { IUsersRepository } from "../../modules/acccounts/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/acccounts/repositories/UsersRepository";
import { ICategoriesRespository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRespository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRespository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRespository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
