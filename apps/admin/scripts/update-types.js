// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const { exec } = require('child_process');

exec(
  `npx openapi-typescript ${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY} --output lib/types/database/index.ts`,
  (err, stdout) => {
    if (err) throw err;
    else console.log(stdout);
  }
);
