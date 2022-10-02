import fake from "@sigodenjs/fake";
import { lorem } from "./Articles";
import Chance from "chance";
import { v4 } from "uuid";
export const chance = new Chance();
export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdOn: Date;
  isActive: boolean
}
export const getUsers = () => {
  const temp: IUser[] = [];
  for (let numOfUsers = 0; numOfUsers < 100; numOfUsers++) {
    const user = {
      username: fake.username(),
      email: chance.email(),
      password: chance.word(),
      firstName: fake.first(),
      lastName: fake.last(),
      active: lorem.generator.generateRandomInteger(1, 100) % 2 === 0,
      isAdmin: lorem.generator.generateRandomInteger(1, 100) % 2 === 0,
      createdOn: new Date(),
      id: `key-${v4()}`,
      isActive: lorem.generator.generateRandomInteger(1, 100) % 2 === 0
    } as IUser;
    temp.push(user);
  }
  return temp;
};
