import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { users } from '../entities/users';

export class userSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ) : Promise<any> {
    const repository =  dataSource.getRepository(users);
    const userData = {
      name: 'Fintipenn'
    }    

    const userCheck = await repository.findOne({
      where: {
        name: userData.name
      }
    })

    if(!userCheck){
      const newUser = repository.create(userData)
      await repository.save(newUser)
    }
  }
}