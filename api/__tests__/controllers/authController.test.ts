import { Request, Response } from 'express';
import { AuthController } from '../../src/controllers/authController';
import { AuthService } from '../../src/services/authService';

jest.mock('../../src/services/authService');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: jest.Mocked<AuthService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeAll(() => {
    authService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
    authController['authService'] = authService;

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should login and return a token', async () => {
    req.body = { email: 'test@example.com', password: 'password' };
    authService.login.mockResolvedValue('mocked_token');

    await authController.login(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mocked_token' });
  });

  it('should add a new user and return user data', async () => {
    req.body = { email: 'newuser@example.com', password: 'password', name: 'John Doe' };
    const mockUser = { id: 2, email: 'newuser@example.com', password: 'hashed_password', name: 'John Doe' };
    authService.addUser.mockResolvedValue(mockUser);

    await authController.addUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, email: 'user1@example.com', password: 'password1', name: 'John Doe' },
      { id: 2, email: 'user2@example.com', password: 'password2', name: 'Kate Smith' },
    ];
    authService.fetchAllUsers.mockResolvedValue(mockUsers);

    await authController.getAllUsers(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
});
