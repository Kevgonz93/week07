export type AppRepo<T, C> = {
  readAll(): Promise<T[]>;
  readById(id: string): Promise<T>;
  create(data: C): Promise<T>;
  update(id: string, data: Partial<C>): Promise<T>;
  delete(id: string): Promise<T>;
};

export type WithLoginRepo<T, C> = AppRepo<T, C> & {
  searchForLogin(key: 'email' | 'name', value: string): Promise<Partial<T>>;
};
