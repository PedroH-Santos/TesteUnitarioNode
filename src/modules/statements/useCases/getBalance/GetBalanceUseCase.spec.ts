
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let getBalanceUseCase: GetBalanceUseCase;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Get Ballance ", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository);
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  })

  it("should be able to get the user account balance", async () => {
    const user = await createUserUseCase.execute({
      name: 'PEDRO',
      email: 'PEDRO@GMAIL.COM',
      password: '1234',
    });
    const statementDEPOSIT = await createStatementUseCase.execute({
      'user_id': user.id as string,
      'description': '123',
      'amount': 200,
      'type': OperationType.DEPOSIT,
    });

    const statementWITHDRAW = await createStatementUseCase.execute({
      'user_id': user.id as string,
      'description': '123',
      'amount': 20,
      'type': OperationType.WITHDRAW,
    });
    const result = await getBalanceUseCase.execute({
      user_id: user.id as string
    });
    expect(result).toHaveProperty("balance");
    expect(result.balance).toBeGreaterThan(0);



  })


  it("should not be able to get the user account balance with user not exist", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: 'PEDRO',
        email: 'PEDRO@GMAIL.COM',
        password: '1234',
      });
      const statementDEPOSIT = await createStatementUseCase.execute({
        'user_id': user.id as string,
        'description': '123',
        'amount': 200,
        'type': OperationType.DEPOSIT,
      });

      const statementWITHDRAW = await createStatementUseCase.execute({
        'user_id': user.id as string,
        'description': '123',
        'amount': 20,
        'type': OperationType.WITHDRAW,
      });
      const result = await getBalanceUseCase.execute({
        user_id: '12312321' as string
      });
    }).rejects.toBeInstanceOf(AppError);


  })








})
