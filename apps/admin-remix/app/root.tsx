import React, { useEffect } from "react";

import {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { SUPABASE_ANON_PUBLIC, SUPABASE_URL } from "./core/utils/env.server";
import baseCss from "./styles/base.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import Progress from "~/core/components/Progress";
import { json, useLoaderData } from "~/core/utils/superjson-remix";
import { requireAuthSession } from "~/core/auth/guards";
import { getUserByEmail, TUser } from "~/modules/user/queries";
import { useUserStore } from "~/modules/store";
import { commitAuthSession, getAuthSession } from "~/core/auth/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: baseCss },
  { rel: "stylesheet", href: tailwindStylesheetUrl },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "VoucherTatry - panel administracyjny",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: TUser | null;
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
  let user = null;
  if (authSession) {
    user = await getUserByEmail(authSession?.email);
  }

  return json<LoaderData>({
    user,
    ENV: {
      SUPABASE_URL,
      SUPABASE_ANON_PUBLIC,
    },
  });
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
  const { ENV, user } = useLoaderData<LoaderData>();

  const { storeUser, setUser } = useUserStore((store) => ({
    storeUser: store.user,
    setUser: store.setUser,
  }));

  useEffect(() => {
    if (user && (!storeUser || storeUser?.id !== user?.id))
      setUser({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      });
  }, [user, storeUser, setUser]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-stone-100 antialiased">
        <Progress />
        {children}
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
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
