import Link from 'next/link';

import { CTABanner } from '../components/CTABanner';
import { LinkButton } from '../components/LinkButton';
import { ComponentStronaBaner } from '../generated/graphql';
import { Section } from '../layout/Section';

const Banner = (props: Partial<ComponentStronaBaner>) => (
  <Section>
    <CTABanner
      title={
        props?.tekst ??
        'Dołącz do grona osób które jako pierwsze będą miały możliwość odkryć najlepsze zniżki na tatrzańske atrakcje.'
      }
      subtitle={
        props?.podsumowanie ?? 'Wpisz się na listę oczekujących już dziś'
      }
      button={
        <Link href="#">
          <a>
            <LinkButton>{props?.przycisk ?? 'Dołączam'}</LinkButton>
          </a>
        </Link>
      }
    />
  </Section>
);

export { Banner };
