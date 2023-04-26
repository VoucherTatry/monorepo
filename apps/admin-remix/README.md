# Admin panel

## What's used in the app

- Production-ready [Supabase Database](https://supabase.com/)
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Magic Link registation & login
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

- Create a [Supabase Database](https://supabase.com/) (Free tiers gives you 2 databases)

  > **Note:** Also works with [Supabase CLI](https://github.com/supabase/cli) and local self-hosting. (Adjustements of `supabase/config.toml` might be needed)

  > **Note:** Create a strong database password, but prefer a passphrase, it'll be more easy to use in connection string (no need to escape special char)
  >
  > _example : my_strong_passphrase_

- Go to https://app.supabase.io/project/{PROJECT}/settings/api to find your secrets
- "Project API keys"
- Add your `SUPABASE_URL`, `SERVER_URL`, `SUPABASE_SERVICE_ROLE` (aka `service_role` `secret`), `SUPABASE_ANON_PUBLIC` (aka `anon` `public`) and `DATABASE_URL` in the `.env` file
  > **Note:** `SERVER_URL` is your localhost on dev. It'll work for magic link login

```en
DATABASE_URL="postgres://postgres:{STAGING_POSTGRES_PASSWORD}@db.{STAGING_YOUR_INSTANCE_NAME}.supabase.co:5432/postgres"
SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:12345/postgres"
SUPABASE_ANON_PUBLIC="{ANON_PUBLIC}"
SUPABASE_SERVICE_ROLE="{SERVICE_ROLE}"
SUPABASE_URL="https://{STAGING_YOUR_INSTANCE_NAME}.supabase.co"
SESSION_SECRET="super-duper-s3cret"
SERVER_URL="http://localhost:3000"
```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.

CC BY-NC-SA 4.0

```

```
