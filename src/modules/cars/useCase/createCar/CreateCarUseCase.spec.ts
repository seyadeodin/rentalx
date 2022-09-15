import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Describing car",
      daily_rate: 100,
      license_plate: "ABC1245",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create car with existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Describing car",
        daily_rate: 100,
        license_plate: "ABC1245",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Describing car",
        daily_rate: 100,
        license_plate: "ABC1245",
        fine_amount: 60,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should create a car as available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Describing car",
      daily_rate: 100,
      license_plate: "A1BCT245",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    console.log(car);

    expect(car.available).toBe(true);
  });
});
