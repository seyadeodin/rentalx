import { CategoriesRepository } from "../repositories/CategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

/*
- [] Define retunr type
- [] Change error return
- [] Acess repostiroy
- [] Return something
*/

class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
