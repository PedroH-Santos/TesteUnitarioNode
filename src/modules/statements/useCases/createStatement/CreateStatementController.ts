import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: sender_id } = request.user;
    let { user_id } = request.params;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split('/')
    let type: OperationType;

    const isTransferStatement = user_id !== undefined;

    if (isTransferStatement) {
      type = splittedPath[splittedPath.length - 2] as OperationType;
    } else {
      type = splittedPath[splittedPath.length - 1] as OperationType;
      user_id = sender_id;
    }
    const createStatement = container.resolve(CreateStatementUseCase);
    const statement = await createStatement.execute({
      user_id,
      type,
      sender_id,
      amount,
      description
    });
    return response.status(201).json(statement);



  }
}
