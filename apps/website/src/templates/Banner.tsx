import Link from 'next/link';

import { CTABanner } from '../components/CTABanner';
import { LinkButton } from '../components/LinkButton';
import type { Banner as BannerType } from '../generated/graphql';
import { Section } from '../layout/Section';

const Banner = (props: Partial<BannerType>) => (
  <Section>
    <CTABanner
      title={
        props?.text ??
        'Dołącz do grona osób które jako pierwsze będą miały możliwość odkryć najlepsze zniżki na tatrzańske atrakcje.'
      }
      subtitle={props?.summary ?? 'Wpisz się na listę oczekujących już dziś'}
      button={
        <Link href="#" passHref>
          <a>
            <LinkButton>{props?.button ?? 'Dołączam'}</LinkButton>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
