import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/Users";

class UsersService {

  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create( email: string ) {

    const userAlreadyExists = await this.usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const users = this.usersRepository.create({
      email
    })
  
    await this.usersRepository.save(users);

    return users;

  }

}

export { UsersService };