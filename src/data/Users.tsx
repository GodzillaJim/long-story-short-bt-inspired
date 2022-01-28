import Jabber from "jabber"
export const jabber = new Jabber();
export interface IUser{
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    active: boolean;
    isAdmin: boolean;
}
export const getUsers = () => {
  const temp: IUser[] = [];
  for (let numOfUsers = 0; numOfUsers < 10; numOfUsers++) {
    const user = {
    
    };
  }
};
