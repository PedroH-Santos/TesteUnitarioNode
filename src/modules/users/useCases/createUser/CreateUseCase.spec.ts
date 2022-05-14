import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";



let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUsersRepository;

describe("Show User Profile", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  })

  it("should be create user", async () => {
    const userSearch = await createUserUseCase.execute({
      name: 'PEDRO',
      email: 'PEDRO@GMAIL.COM',
      password: '1234',
    });

    expect(userSearch).toHaveProperty("id");

  })


  it("should not be create user with same id", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      });
      await createUserUseCase.execute({
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      });

    }).rejects.toBeInstanceOf(AppError);


  })



})
