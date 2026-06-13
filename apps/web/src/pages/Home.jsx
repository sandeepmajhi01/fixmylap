import { useEffect } from 'react';
import Hero from '../components/common/Hero';
import Grid from '../components/common/Grid';
import Emergency from '../components/common/Emergency';
import FeaturedProducts from '../components/common/FeaturedProducts';
import Testimonial from '../components/common/Testimonial';
import Blog from '../components/common/Blog';
import ContactSection from '../components/common/ContactSection';

function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <Grid />
      <Emergency />
      <FeaturedProducts />
      <Testimonial />
      <Blog />
      <ContactSection />
    </>
  );
}

export default Home;