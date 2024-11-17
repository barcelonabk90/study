import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/userRepository';

export class AuthService {
  private userRepository: UserRepository;

  /**
   * Initializes a new instance of the AuthService class.
   */
  constructor() {
    // Initialize the user repository for database operations.
    this.userRepository = new UserRepository();
  }

  /******  6e4c3945-0065-4595-b401-3663a1354f9e  *******/
  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  }

  async addUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.addUser(email, hashedPassword);
  }

  async fetchAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}