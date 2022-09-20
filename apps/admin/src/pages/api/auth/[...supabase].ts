import { handleAuth } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default function AuthHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.cookie || req.query.supabase?.[0] === 'callback') {
    // @ts-ignore
    handleAuth({ logout: { returnTo: '/auth' } })(req, res);
  } else {
    res.status(200).json({});
  }
}
