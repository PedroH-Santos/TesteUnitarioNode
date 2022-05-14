import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";



let showUserProfileUseCase: ShowUserProfileUseCase;
let userRepository: InMemoryUsersRepository;

describe("Show User Profile" , () =>{
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(userRepository);
  })

  it("should be show user", async () => {
    const user = await userRepository.create({
      name: 'PEDRO',
      email: 'PEDRO@GMAIL.COM',
      password: '1234',
    });
    const userId = user.id as string;
    const userSearch = await  showUserProfileUseCase.execute(userId);

    expect(userSearch).toEqual(user);

  })



})
