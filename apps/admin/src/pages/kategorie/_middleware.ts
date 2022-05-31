import { withMiddlewareAuth } from '@supabase/supabase-auth-helpers/nextjs/middleware';
import { NextMiddleware } from 'next/server';

export const middleware: NextMiddleware = withMiddlewareAuth({
  redirectTo: '/auth',
});
