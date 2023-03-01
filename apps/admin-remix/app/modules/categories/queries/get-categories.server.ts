import type { Category } from "@prisma/client";

import { db } from "~/database";

export async function getCategories(): Promise<Category[]> {
  return db.category.findMany();
}
