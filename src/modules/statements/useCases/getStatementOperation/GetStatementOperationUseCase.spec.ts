import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";


let getStatementOperationUseCase: GetStatementOperationUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepository: InMemoryUsersRepository;
let statementRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}
describe("Show Authenticate User", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    statementRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    getStatementOperationUseCase = new GetStatementOperationUseCase(userRepository, statementRepository);
    createStatementUseCase = new CreateStatementUseCase(userRepository, statementRepository);

  })

  it("should be get statement operation ", async () => {
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



    const findStatement = await getStatementOperationUseCase.execute({ user_id: user.id as string, statement_id: statement.id as string });

    expect(findStatement).toEqual(statement);

  })


  it("should not be get statement operation  with user not exist ", async () => {
    expect(async () => {
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



      const findStatement = await getStatementOperationUseCase.execute({ user_id: '1234' as string, statement_id: statement.id as string });

      expect(findStatement).toEqual(statement);

    }).rejects.toBeInstanceOf(AppError);


  })



  it("should not be get statement operation  with statement not exist ", async () => {
    expect(async () => {
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



      const findStatement = await getStatementOperationUseCase.execute({ user_id: user.id as string as string, statement_id: '1243' as string });

      expect(findStatement).toEqual(statement);

    }).rejects.toBeInstanceOf(AppError);


  })

});
