# VoucherTatry monorepo

This is a monorepo for VoucherTatry project.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `apps/admin-remix`: a [RemixJS](https://remix.run/), [Supabase](https://supabase.com/) app to handle administration part of app (registration of merchants, adding new campaigns etc.)
- `apps/website`: [Next.js](https://nextjs.org) landing page
- `ui`: a stub React component library that can be shared across all applications
- `eslint-config-custom`: `eslint` configurations for `postcss`, `tailwind`
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo` command, and selected when choosing which package manager you wish to use with your monorepo (Pnpm).

### Build

To build all apps and packages, run the following command:

```
cd monorepo
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```
cd monorepo
pnpm run dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
