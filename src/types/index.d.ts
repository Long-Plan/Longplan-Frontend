export * from "./user";

export type TResponseOK<T> = {
  success: boolean;
  message: string;
  result: T;
};
