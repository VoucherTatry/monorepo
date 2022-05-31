import { ReactNode } from 'react';

import CenteredFooterClassNames from './CenteredFooter.module.css';
import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList?: ReactNode;
  children: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    <div className={CenteredFooterClassNames['footer-logo']}>{props.logo}</div>

    <nav>
      <ul className={CenteredFooterClassNames.navbar}>{props.children}</ul>
    </nav>

    {props.iconList && (
      <div className="mt-8 flex justify-center">
        <FooterIconList>{props.iconList}</FooterIconList>
      </div>
    )}

    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>
  </div>
);

export { CenteredFooter };
