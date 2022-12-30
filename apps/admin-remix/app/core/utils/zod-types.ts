import { ZodRawShape, ZodTypeAny } from "zod";

export type ZodShape<T> = {
  [k in keyof T]: ZodTypeAny;
};
