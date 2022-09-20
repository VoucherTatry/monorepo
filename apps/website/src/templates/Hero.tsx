import { Background } from '../components/background/Background';
import { HeroEmailInput } from '../components/hero/HeroEmailInput';
import { Hero as HeroTypr } from '../generated/graphql';
import { Section } from '../layout/Section';

const Hero = (props: Partial<HeroTypr>) => (
  <Background color="bg-stone-100">
    <Section yPadding="pt-10 sm:pt-20 pb-16 sm:pb-32 text-center">
      <HeroEmailInput
        title={{
          firstLine: props?.titleFirstLine ?? 'Witaj w Tatrach!',
          secondLine: (
            <strong className="text-rose-500">
              {props?.titleSecondLine ??
                'Znajdź najlepsze miejsce na spędzenie czasu.'}
            </strong>
          ),
        }}
        description={
          props?.description ??
          'U nas znajdziesz najlepsze rabaty na najciekawsze atrakcje. Dopisz się do listy oczekujących już dziś!'
        }
        buttonText={props?.ctaButtonLabel ?? 'Zapisz się!'}
      />
    </Section>
  </Background>
);

export { Hero };
