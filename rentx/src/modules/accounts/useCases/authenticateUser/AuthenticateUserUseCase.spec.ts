import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "tester ",
      password: "1234",
      driver_license: "123456",
      email: "teste@teste.com"
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "teste@teste.com",
        password: "1234"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("should not be able to authenticate a wrong password user", async () => {
    const user: ICreateUserDTO = {
      name: "tester ",
      password: "1234",
      driver_license: "123456",
      email: "teste@teste.com"
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "123123123"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
