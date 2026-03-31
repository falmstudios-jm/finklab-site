import Header from '@/components/Header';
import CloudLayer from '@/components/CloudLayer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FeatureSlideshow from '@/components/FeatureSlideshow';
import DetectionSection from '@/components/DetectionSection';
import DataSection from '@/components/DataSection';
import AppShowcase from '@/components/AppShowcase';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <CloudLayer />
      <Header />
      <main className="relative z-[2]">
        <Hero />
        <Features />
        <FeatureSlideshow />
        <DetectionSection />
        <DataSection />
        <AppShowcase />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
