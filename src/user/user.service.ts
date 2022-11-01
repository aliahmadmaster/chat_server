import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { User } from './schema/user.schema';
import { UserModel } from './schema/user.model';
import { GetUser } from './dto/get-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserData: CreateUserDTO) {
    await this.validateCreateUserData(createUserData);
    const user = await this.userRepository.create({
      ...createUserData,
      password: await bcrypt.hash(createUserData.password, 10),
    });
    return this.toModel(user);
  }
  async getUser(getUser: GetUser) {
    const userDocument = await this.userRepository.findById(getUser);
    return this.toModel(userDocument);
  }
  
  async validateUser(email: string, password: string) {
    const userDocument = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(
      password,
      userDocument.password,
    );
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return this.toModel(userDocument);
  }
  private async validateCreateUserData(createUserData: CreateUserDTO) {
    try {
      await this.userRepository.findOne({ email: createUserData.email });
      throw new UnprocessableEntityException('Email already exists.');
    } catch (err) {}
  }
  async getUsers(page: number, count: number){
    
    const users = await this.userRepository.findPagination({},page, count)
    return users.map((user) => this.toModel(user));
  }
  private toModel(userDocument: User): UserModel {
    return {
      id: userDocument._id.toHexString(),
      name: userDocument.name,
      email: userDocument.email,

    };
  }
  
}
