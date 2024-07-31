import Header from "@/components/landing_page/Header";
import Hero from "@/components/landing_page/Hero";
import Benefits from "@/components/landing_page/Benefits";
import Collaboration from "@/components/landing_page/Collaboration";
import Services from "@/components/landing_page/Services";
import Pricing from "@/components/landing_page/Pricing";
import Roadmap from "@/components/landing_page/Roadmap";
import Footer from "@/components/landing_page/Footer";
// import ButtonGradient from "../assets/svg/ButtonGradient";
const Home: React.FC = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] bg-slate-50 w-screen overflow-x-hidden">
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
