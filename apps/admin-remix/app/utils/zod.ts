import type { ZodCustomIssue, ZodIssue, ZodTypeAny } from "zod";

export type ZodShape<T> = {
  [k in keyof T]: ZodTypeAny;
};

type ZodCustomIssueWithMessage = ZodCustomIssue & { message: string };

export function createFormIssues(
  issues?: ZodIssue[]
): ZodCustomIssueWithMessage[] | undefined {
  return issues?.map(({ message, path }) => ({
    code: "custom",
    message,
    path,
  }));
}
