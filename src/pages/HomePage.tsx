import { AboutTeaserSection } from '../sections/AboutTeaserSection'
import { CtaSection } from '../sections/CtaSection'
import { HeroSection } from '../sections/HeroSection'
import { ProcessSection } from '../sections/ProcessSection'
import { SectorsSection } from '../sections/SectorsSection'
import { WhatWeDoTeaserSection } from '../sections/WhatWeDoTeaserSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutTeaserSection />
      <WhatWeDoTeaserSection />
      <SectorsSection carousel />
      <ProcessSection />
      <CtaSection />
    </>
  )
}
