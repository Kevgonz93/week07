export type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthDate: Date;
  role: 'admin' | 'user' | 'guest';
};

export type UserCreateDto = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthDateString: string;
  role: 'admin' | 'user' | 'guest';
};

export type UserUpdateDto = Partial<UserCreateDto>;
