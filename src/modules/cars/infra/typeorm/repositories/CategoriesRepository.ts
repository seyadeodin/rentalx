import { Repository } from "typeorm";

import {
  ICategoriesRespository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { dataSource } from "@shared/infra/typeorm";

import { Category } from "../entities/Category";

class CategoriesRepository implements ICategoriesRespository {
  // private static INSTANCE: CategoriesRepository;

  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }
  //   return CategoriesRepository.INSTANCE;
  // }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    console.log({ categories });
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };

// singleton:
