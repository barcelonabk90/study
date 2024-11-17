import { UserRepository } from '../../src/repositories/userRepository';
import { User } from '../../src/entities/User';
import { AppDataSource } from '../../src/config/db';

jest.mock('../../src/config/db');

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeAll(() => {
    userRepository = new UserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';
    const mockUser = { id: 1, email, password: 'hashed_password' } as User;

    jest.spyOn(userRepository['userRepository'], 'findOneBy').mockResolvedValue(mockUser);

    const user = await userRepository.findByEmail(email);
    expect(user).toEqual(mockUser);
  });

  it('should add a user to the database', async () => {
    const email = 'newuser@example.com';
    const password = 'hashed_password';
    const mockUser = { id: 2, email, password } as User;

    jest.spyOn(userRepository['userRepository'], 'save').mockResolvedValue(mockUser);

    const user = await userRepository.addUser(email, password);
    expect(user).toEqual(mockUser);
  });

  it('should retrieve all users', async () => {
    const mockUsers = [
      { id: 1, email: 'user1@example.com', password: 'password1' },
      { id: 2, email: 'user2@example.com', password: 'password2' },
    ] as User[];

    jest.spyOn(userRepository['userRepository'], 'find').mockResolvedValue(mockUsers);

    const users = await userRepository.getAllUsers();
    expect(users).toEqual(mockUsers);
  });
});
