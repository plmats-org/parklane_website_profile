import About from "../components/about";
import Advantages from "../components/advantages";
import Contact from "../components/contacts";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Logistics from "../components/logistics";
import Navbar from "../components/navbar";
import Partners from "../components/partners";
import Services from "../components/services";
import SourcingModel from "../components/sourcing";
import WhyPLM from "../components/whyPln";


export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <SourcingModel />
      <Advantages />
      <WhyPLM />
      <Logistics />
      <Partners />
      <Contact />
      <Footer />
    </main>
  );
}