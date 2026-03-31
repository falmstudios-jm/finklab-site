import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
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
      <Header />
      <main>
        <Hero />
        <Features />
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
