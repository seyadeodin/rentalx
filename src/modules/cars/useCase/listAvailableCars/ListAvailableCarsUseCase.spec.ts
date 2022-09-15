import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car T",
      category_id: "category",
      daily_rate: 250,
      fine_amount: 160,
      license_plate: "LA2A4B1",
      name: "Testing car",
      description: "Car on test",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availablee cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car T",
      category_id: "category",
      daily_rate: 250,
      fine_amount: 160,
      license_plate: "LA2A4B1",
      name: "Testing car",
      description: "Car on test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car T",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availablee cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car T",
      category_id: "category",
      daily_rate: 250,
      fine_amount: 160,
      license_plate: "LA2A4B1",
      name: "Car by name",
      description: "Car on test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car by name",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availablee cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car T",
      category_id: "category",
      daily_rate: 250,
      fine_amount: 160,
      license_plate: "LA2A4B1",
      name: "Car by name",
      description: "Car on test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category",
    });

    expect(cars).toEqual([car]);
  });

  it("should not be able to list all availablee cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car T",
      category_id: "category",
      daily_rate: 250,
      fine_amount: 160,
      license_plate: "LA2A4B1",
      name: "Car by name",
      description: "Car on test",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category",
    });

    expect(cars).toEqual([car]);
  });
});
