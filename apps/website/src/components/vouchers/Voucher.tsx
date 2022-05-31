import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

type IVoucherProps = {
  isPlaceholder?: boolean;
  title: string;
  image: string;
  alt: string;
  href: string;
};

const VoucherContent = (props: IVoucherProps) => (
  <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow shadow-stone-300 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md hover:shadow-stone-400">
    <div className="relative aspect-square w-full">
      {props.isPlaceholder && (
        <p className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 text-center text-xl font-bold leading-none text-white drop-shadow">
          Dodaj voucher
        </p>
      )}
      <Image
        className={clsx({
          'opacity-75 grayscale filter': props.isPlaceholder,
        })}
        layout="fill"
        objectFit="cover"
        src={props.image}
        alt={props.alt}
      />
    </div>
    <h3 className="leading-thight px-2 pt-2 pb-5 text-base font-bold text-stone-900 md:px-4 md:pt-3 md:pb-6 md:text-xl xl:text-2xl">
      {props.title}
    </h3>
  </div>
);

const Voucher = (props: IVoucherProps) => {
  if (props.href === '#') {
    return (
      <a className="w-40 flex-shrink-0 md:w-56" href={props.href}>
        <VoucherContent {...props} />
      </a>
    );
  }

  return (
    <Link href={props.href}>
      <a className="w-40 flex-shrink-0 md:w-56">
        <VoucherContent {...props} />
      </a>
    </Link>
  );
};

export { Voucher };
