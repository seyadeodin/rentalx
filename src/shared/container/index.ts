import { container } from "tsyringe";

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
