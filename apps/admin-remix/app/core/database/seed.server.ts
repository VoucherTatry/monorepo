/* eslint-disable no-console */
import type { Category } from "@prisma/client";
import { PrismaClient, Role } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

import { SUPABASE_SERVICE_ROLE, SUPABASE_URL } from "../utils/env.server";

if (!SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not set");
}

if (!SUPABASE_SERVICE_ROLE) {
  throw new Error("SUPABASE_SERVICE_ROLE is not set");
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
  autoRefreshToken: false,
  persistSession: false,
});

const prisma = new PrismaClient();

const email = "hello@supabase.com";

const getUserId = async (): Promise<string> => {
  const existingUserId = await supabaseAdmin.auth.api
    .listUsers()
    .then(({ data }) => data?.find((user) => user.email === email)?.id);

  if (existingUserId) return existingUserId;

  const newUserId = await supabaseAdmin.auth.api
    .createUser({
      email,
      password: "supabase",
      email_confirm: true,
    })
    .then(({ user }) => user?.id);

  if (newUserId) return newUserId;

  throw new Error("Could not create or get user");
};

async function seed() {
  const id = await getUserId();

  let user = await prisma.user.findUnique({ where: { id } });
  if (user === null) {
    user = await prisma.user.create({
      data: {
        email,
        id,
        role: Role.SUPER_ADMIN,
      },
    });
  }

  const defaultCategories: { name: Category["name"] }[] = [
    { name: "Arakcje" },
    { name: "Atrakcje dla dzieci" },
    { name: "Wycieczki jednodniowe" },
    { name: "Wycieczki w Tatry" },
    { name: "Termy i baseny" },
    { name: "Restauracje" },
    { name: "Kwatery prywatne" },
    { name: "Hotele" },
  ];

  await Promise.all(
    defaultCategories.map(async (category) => {
      const categoryByName = await prisma.category.findUnique({
        where: { name: category.name },
      });

      const categoryExist = categoryByName !== null;
      if (categoryExist) return;

      return prisma.category.create({ data: category });
    })
  );

  console.log(`Database has been seeded. 🌱\n`);
  console.log(
    `User added to your database 👇 \n🆔: ${user.id}\n📧: ${user.email}\n🔑: supabase`
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });