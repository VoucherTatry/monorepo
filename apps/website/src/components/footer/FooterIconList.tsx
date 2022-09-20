import type { ReactNode } from 'react';

import FooterIconListClassNames from './FooterIconList.module.css';

type IFooterIconListProps = {
  children: ReactNode;
};

const FooterIconList = (props: IFooterIconListProps) => (
  <div className={FooterIconListClassNames['footer-icon-list']}>
    {props.children}
  </div>
);

export { FooterIconList };
