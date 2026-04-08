export type User = {
  emailAddress: string;
  password: string;
  fullName: string;
};

export const users: User[] = [
  {
    emailAddress: 'TestUser1@mail.com',
    password: '123@stA.com',
    fullName: 'TestUser1FirstName TestUser1LastName',
  },
];
