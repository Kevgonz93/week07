export type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
};

export type UserCreateDto = {
  name: string;
  lastname: string;
  email: string;
};
