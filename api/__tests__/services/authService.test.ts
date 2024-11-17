import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthService } from '../../src/services/authService';
import { UserRepository } from '../../src/repositories/userRepository';
import { User } from '../../src/entities/User';

jest.mock('../../src/repositories/userRepository');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeAll(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    authService = new AuthService();
    authService['userRepository'] = userRepository;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login a user with correct credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const mockUser = { id: 1, email, password: hashedPassword } as User;

    userRepository.findByEmail.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('mocked_token');

    const token = await authService.login(email, password);
    expect(token).toBe('mocked_token');
  });

  it('should add a new user', async () => {
    const email = 'newuser@example.com';
    const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10);
    const mockUser = { id: 2, email, password: hashedPassword } as User;

    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword);
    userRepository.addUser.mockResolvedValue(mockUser);

    const user = await authService.addUser(email, password);
    expect(user).toEqual(mockUser);
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      { id: 1, email: 'user1@example.com', password: 'password1' },
      { id: 2, email: 'user2@example.com', password: 'password2' },
    ] as User[];

    userRepository.getAllUsers.mockResolvedValue(mockUsers);

    const users = await authService.fetchAllUsers();
    expect(users).toEqual(mockUsers);
  });
});
