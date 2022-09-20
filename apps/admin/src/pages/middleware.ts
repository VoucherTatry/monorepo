import { NextMiddleware, NextResponse } from 'next/server';

// export const middleware: NextMiddleware = withMiddlewareAuth({
//   redirectTo: '/auth',
// });

export const middleware: NextMiddleware = (req) =>
  NextResponse.rewrite(req.url);
