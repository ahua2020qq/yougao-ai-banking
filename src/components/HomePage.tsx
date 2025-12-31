import { Hero } from './Hero';
import { IntroSection } from './IntroSection';
import { RedefineSection } from './RedefineSection';
import { StorySection } from './StorySection';
import { ComparisonSection } from './ComparisonSection';
import { ForEveryoneSection } from './ForEveryoneSection';
import { PromiseSection } from './PromiseSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

interface HomePageProps {
  scrollY: number;
  onStartService: () => void;
}

export function HomePage({ scrollY, onStartService }: HomePageProps) {
  return (
    <>
      <Hero scrollY={scrollY} onStartService={onStartService} />
      <IntroSection onStartService={onStartService} />
      <RedefineSection />
      <StorySection />
      <ComparisonSection />
      <ForEveryoneSection />
      <PromiseSection />
      <CTASection onStartService={onStartService} />
      <Footer />
    </>
  );
}
