import { PropsWithChildren } from 'react';

import ContainerCN from './ScrollXContainer.module.css';

type PropsType = PropsWithChildren<{}>;
const ScrollXContainer = (props: PropsType) => (
  <div className={ContainerCN.container}>{props.children}</div>
);

export { ScrollXContainer };
