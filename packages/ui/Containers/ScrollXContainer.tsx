import { PropsWithChildren } from 'react';

type PropsType = PropsWithChildren<{}>;
const ScrollXContainer = (props: PropsType) => (
  <div className="flex w-full snap-x flex-row space-x-8 overflow-x-auto overflow-y-hidden py-4">
    {props.children}
  </div>
);

export { ScrollXContainer };
