import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRespository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  // receive file from controller
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRespository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // creates a read stream from this file using its path
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      // pass it the parseFile
      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
