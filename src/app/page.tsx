import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FlockAnimation from '@/components/FlockAnimation';
import DetectionSection from '@/components/DetectionSection';
import DataSection from '@/components/DataSection';
import AppShowcase from '@/components/AppShowcase';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ParallaxBirds from '@/components/ParallaxBirds';

export default function Home() {
  return (
    <>
      <ParallaxBirds />
      <Header />
      <main className="relative z-[2]">
        <Hero />
        <Features />
        <FlockAnimation />
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
