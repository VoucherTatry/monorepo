import type { PostgrestError } from '@supabase/supabase-js';
import type { DehydratedState } from 'react-query';

export type DehydratedStaticProps =
  | {
      dehydratedState: DehydratedState;
      ssrError: null;
    }
  | {
      ssrError: PostgrestError;
    };
