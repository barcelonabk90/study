import { AppDataSource } from '../config/db';
import { User } from '../entities/User';

export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async addUser(email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ email, password });
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}