/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyObject = Record<string, unknown>;

export type As<Props = any> = React.ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, 'as' | OmitAdditionalProps>;

export type RightJoinProps<
  SourceProps extends object = AnyObject,
  OverrideProps extends object = AnyObject
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = AnyObject,
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & {
    as?: AsComponent;
  };

export type ComponentWithAs<
  Component extends As,
  Props extends object = AnyObject
> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentProps<Component>,
      React.ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;
  displayName?: string;
  propTypes?: React.WeakValidationMap<any>;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export type PolymorphicProps<T extends As, P> = Omit<PropsOf<T>, 'ref'> &
  P & {
    as?: As;
  };

export type PolymorphicComponent<T extends As, P = AnyObject> = ComponentWithAs<
  T,
  AnyObject & P
>;
