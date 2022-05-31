import React from 'react';

import rehypeReact from 'rehype-react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export default function PrintMarkdown({ markdown }: { markdown: string }) {
  const content = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement: React.createElement })
    .processSync(markdown).result;

  return <>{content}</>;
}
