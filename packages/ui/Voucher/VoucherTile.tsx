import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import VoucherCN from './VoucherTile.module.css';

type IVoucherProps = {
  isPlaceholder?: boolean;
  title: string;
  image: string;
  alt: string;
  href: string;
};

const VoucherContent = (props: IVoucherProps) => (
  <div className={VoucherCN.content}>
    <div className={VoucherCN.contentFigure}>
      {props.isPlaceholder && (
        <p className={VoucherCN.contentFigureCaption}>Dodaj voucher</p>
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
    <h3 className={VoucherCN.contentTitle}>{props.title}</h3>
  </div>
);

const Voucher = (props: IVoucherProps) => {
  if (props.href === '#') {
    return (
      <a className={VoucherCN.wrapper} href={props.href}>
        <VoucherContent {...props} />
      </a>
    );
  }

  return (
    <Link href={props.href}>
      <a className={VoucherCN.wrapper}>
        <VoucherContent {...props} />
      </a>
    </Link>
  );
};

export { Voucher };
