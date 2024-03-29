type VoucherProps = {
  isPlaceholder?: boolean;
  image: JSX.Element;
  title: string;
  href: string;
};

const VoucherContent = (props: Omit<VoucherProps, 'LinkEl'>) => (
  <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow shadow-stone-300 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-stone-400">
    <div className="relative aspect-[1/1] w-full">
      {props.isPlaceholder && (
        <p className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 text-center text-xl font-bold leading-none text-white drop-shadow">
          Dodaj voucher
        </p>
      )}
      {props.image}
    </div>
    <h3 className="px-2 pt-2 pb-5 text-base font-bold leading-tight text-stone-900 md:px-4 md:pt-3 md:pb-6 md:text-xl xl:text-2xl">
      {props.title}
    </h3>
  </div>
);

const Voucher = ({ ...props }: VoucherProps) => {
  if (props.href === '#') {
    return (
      <a className="w-40 flex-shrink-0 md:w-56" href={props.href}>
        <VoucherContent {...props} />
      </a>
    );
  }

  return (
    <a className="w-40 flex-shrink-0 md:w-56">
      <VoucherContent {...props} />
    </a>
  );
};

export { Voucher };
