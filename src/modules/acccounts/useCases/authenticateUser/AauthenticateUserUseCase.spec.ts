import { AppError } from "@shared/errors/AppErrors";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUserCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234567",
      name: "User test",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUserCase.execute({
      email: user?.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate with incorrect email", () => {
    expect(async () => {
      await authenticateUserUserCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "00123",
        email: "user@test.com",
        password: "1234567",
        name: "User test",
      };

      await createUserUseCase.execute(user);
      await authenticateUserUserCase.execute({
        email: user.email,
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
