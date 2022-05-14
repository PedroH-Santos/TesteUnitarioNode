import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";



let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUsersRepository;

describe("Show Authenticate User", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

  })

  it("should be authenticate user", async () => {
    const user: ICreateUserDTO = {
      name: 'PEDRO',
      email: 'PEDRO@GMAIL.COM',
      password: '1234',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token");

  })


  it("should  not be authenticate user with incorret password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      };
      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: '12345'
      })
      expect(result).toHaveProperty("token");
    }).rejects.toBeInstanceOf(AppError);



  })

  it("should  not be authenticate user with incorret password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      };
      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: user.email,
        password: '12345'
      })
      expect(result).toHaveProperty("token");
    }).rejects.toBeInstanceOf(AppError);



  })



  it("should  not be authenticate user with incorret user", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      };
      await createUserUseCase.execute(user);

      const result = await authenticateUserUseCase.execute({
        email: '123@gmail.com',
        password: '12345'
      })
      expect(result).toHaveProperty("token");
    }).rejects.toBeInstanceOf(AppError);



  })


})
