import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";





let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUsersRepository;
let statementRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Create Statement ", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    statementRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    createStatementUseCase = new CreateStatementUseCase(userRepository, statementRepository);
  })

  it("should be create Statement", async () => {
    const user = await createUserUseCase.execute({
      name: 'PEDRO',
      email: 'PEDRO@GMAIL.COM',
      password: '1234',
    });


    const statement = await createStatementUseCase.execute({
      'user_id': user.id as string,
      'description': '123',
      'amount': 10,
      'type': OperationType.DEPOSIT,
    });
    expect(statement).toHaveProperty("id");


  })


  it("should be create Statement with negative stock", async () => {
    expect(async () => {

      const user = await createUserUseCase.execute({
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      });
      const statementDEPOSIT = await createStatementUseCase.execute({
        'user_id': user.id as string,
        'description': '123',
        'amount': 10,
        'type': OperationType.DEPOSIT,
      });

      const statementWITHDRAW = await createStatementUseCase.execute({
        'user_id': user.id as string,
        'description': '123',
        'amount': 20,
        'type': OperationType.WITHDRAW,
      });
    }).rejects.toBeInstanceOf(AppError);


  })

  it("should be create Statement with user not exist", async () => {
      expect(async () => {

        const user = await createUserUseCase.execute({
          name: 'PEDRO',
          email: 'PEDRO@GMAIL.COM',
          password: '1234',
        });
        const statement = await createStatementUseCase.execute({
          'user_id': '1232345' as string,
          'description': '123',
          'amount': 10,
          'type': OperationType.DEPOSIT,
        });
      }).rejects.toBeInstanceOf(AppError);



  })






})
