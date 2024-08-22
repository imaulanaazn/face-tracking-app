import Header from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";
import Benefits from "@/components/landing_page/Benefits";
import Collaboration from "@/components/landing_page/Collaboration";
import Pricing from "@/components/landing_page/Pricing";
import Footer from "@/components/landing_page/Footer";
const Home: React.FC = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] bg-white w-screen overflow-x-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Collaboration />
        {/* <Services /> */}
        <Pricing />
        {/* <Roadmap /> */}
        <Footer />
      </div>
      {/* <ButtonGradient /> */}
    </>
  );
};

export default Home;
