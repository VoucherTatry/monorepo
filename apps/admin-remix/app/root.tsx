import React from "react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import type { IUser } from "~/modules/user";

import { Progress } from "~/components/Progress";
import { getAuthSession } from "~/modules/auth/session.server";
import { getBrowserEnv } from "~/utils/env";
import { json, useLoaderData } from "~/utils/superjson-remix";

import tailwindCSS from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindCSS },
  { rel: "preconnect", href: "https://fonts.bunny.net" },
  {
    rel: "stylesheet",
    href: "https://fonts.bunny.net/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.bunny.net/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "VoucherTatry - panel administracyjny",
  viewport: "width=device-width,initial-scale=1",
});

export type RootData = {
  user: IUser | null;
  ENV: {
    SUPABASE_URL: string;
    SUPABASE_ANON_PUBLIC?: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  // uncomment if you want to use realtime supabase features
  // const authSession = await getAuthSession(request);

  // return json({
  //   realtimeSession: {
  //     accessToken: authSession?.accessToken,
  //     expiresIn: authSession?.expiresIn,
  //     expiresAt: authSession?.expiresAt,
  //   },
  //   ENV: {
  //     SUPABASE_URL,
  //     SUPABASE_ANON_PUBLIC,
  //   },
  // });
  const authSession = await getAuthSession(request);

  let user: IUser | null = null;
  if (authSession) {
    user = authSession.user;
  }

  return json<RootData>({
    user,
    ENV: getBrowserEnv(),
  });
};

export default function App() {
  const { ENV } = useLoaderData<RootData>();

  return (
    <html lang="pl">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-100 antialiased">
        <Progress />
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
