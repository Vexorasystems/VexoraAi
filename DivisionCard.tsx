import { Hero } from '@/components/sections/Hero';
import { Divisions } from '@/components/sections/Divisions';
import { Ecosystem } from '@/components/sections/Ecosystem';
import { Catalog } from '@/components/sections/Catalog';
import { Industries, Stats, Voices, Process, Contact } from '@/components/sections/Sections';
import { Operations } from '@/components/sections/Operations';
import { Footer } from '@/components/core/Footer';
import { FlowDivider } from '@/components/ui/Primitives';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlowDivider />
      <Divisions />
      <FlowDivider />
      <Ecosystem />
      <FlowDivider />
      <Catalog />
      <FlowDivider />
      <Industries />
      <Operations />
      <Stats />
      <Voices />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
