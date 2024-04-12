export interface DatabaseTransactor {
  inTransaction: <T>(transactionScope: () => Promise<T>) => Promise<T>;
}
