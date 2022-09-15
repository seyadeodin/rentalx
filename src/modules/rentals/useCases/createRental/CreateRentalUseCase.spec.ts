import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInmemory";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implmentations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateProvider: IDateProvider;

describe("Create rental", () => {
  dayjs.extend(utc);
  const dayAdd24Hours = dayjs().utc().add(1, "day").toDate();
  // how we can create a date with dayjs using dayjs and ayjs/plugin/utc

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "9876",
      expected_return_date: dayAdd24Hours,
    });

    console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental for a user if one is already open", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "9876",
        expected_return_date: new Date("2022/09/14 18:00:00"),
      });

      const rental = await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "4567",
        expected_return_date: new Date(),
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "9876",
        expected_return_date: new Date("2022/09/15"),
      });

      const rental = await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "9876",
        expected_return_date: new Date(),
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with return time smaller than 24 hours", () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "98761",
        expected_return_date: new Date(new Date().getDate() + 1),
      });

      console.log(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
