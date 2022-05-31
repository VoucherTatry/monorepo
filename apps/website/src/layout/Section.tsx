import { ReactNode } from 'react';

import SectionClassNames from './Section.module.css';

type ISectionProps = {
  id?: string;
  title?: string;
  description?: ReactNode;
  yPadding?: string;
  children?: ReactNode;
  titleAlign?: 'text-center' | 'text-left' | 'text-right';
  descriptionAlign?: 'text-center' | 'text-left' | 'text-right';
};

const Section = (props: ISectionProps) => (
  <div
    id={props.id}
    className={`${SectionClassNames.section} ${
      props.yPadding ? props.yPadding : 'py-8 xl:py-10'
    }`}
  >
    {(props.title || props.description) && (
      <div className={SectionClassNames['section-text-wrapper']}>
        {props.title && (
          <h2
            className={`${SectionClassNames['section-title']} ${props.titleAlign}`}
          >
            {props.title}
          </h2>
        )}
        {props.description && (
          <div
            className={`${SectionClassNames['section-description']} ${props.descriptionAlign}`}
          >
            {props.description}
          </div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
