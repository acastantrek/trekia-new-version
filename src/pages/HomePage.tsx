import { AboutTeaserSection } from '../sections/AboutTeaserSection'
import { CtaSection } from '../sections/CtaSection'
import { HeroSection } from '../sections/HeroSection'
import { SectorsSection } from '../sections/SectorsSection'
import { SolutionsSection } from '../sections/SolutionsSection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutTeaserSection />
      <SolutionsSection carousel />
      <SectorsSection carousel />
      <CtaSection />
    </>
  )
}
