import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async addUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const newUser = await this.authService.addUser(email, password);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.authService.fetchAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
