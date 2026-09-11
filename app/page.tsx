import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { Stats } from '@/components/Stats';
import { Certifications } from '@/components/Certifications';
import { Languages } from '@/components/Languages';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <About />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Skills />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Experience />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Projects />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Services />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Certifications />
        <Languages />
        <div className="container-page">
          <div className="divider-hairline" />
        </div>
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
