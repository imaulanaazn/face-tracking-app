import { IPlans } from "@/data-types/merchant";
import Heading from "./Heading";
import PricingList from "./PricingList";
import Section from "./Section";
import { LeftLine, RightLine } from "./design/Pricing";
import Image from "next/image";

const Pricing = ({ pricingList }: { pricingList: IPlans[] }) => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <Image
            src={"/assets/4-small.png"}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={"/assets/pricing/stars.svg"}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Mulai Berlangganan Sekarang"
          title="Tersedia beragam paket"
        />

        <div className="relative">
          <PricingList pricingList={pricingList} />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-4">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b text-blue-600 hover:text-blue-400"
            href="/pricing"
          >
            Lihat Selengkapnya
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
