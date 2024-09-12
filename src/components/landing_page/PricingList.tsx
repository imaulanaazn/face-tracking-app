import CornerAccent from "../../../public/assets/pricing/CornerAccent";
import { IPlans } from "@/data-types/merchant";

export default function PricingList({
  pricingList,
}: {
  pricingList: IPlans[];
}) {
  return (
    <section
      className="
      bg-white
      relative
      z-20
      overflow-hidden
    "
    >
      <div className="w-full">
        <div
          id="pricing-cards-wrapper"
          className="flex flex-wrap lg:flex-nowrap justify-center items-center mb-6 gap-6 md:gap-8"
        >
          {pricingList.map((pricing: any, index: number) => (
            <div key={pricing.id} className="w-full md:w-1/2 lg:w-full">
              <div
                className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-blue-600
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               "
              >
                {/* <span className="text-blue-600 font-semibold text-lg block mb-4">
                  {pricing.name}
                </span>
                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  {pricing.price}
                  <span className="text-base text-body-color font-medium">
                    / Month
                  </span>
                </h2>
                <p
                  className="
                  text-base text-body-color
                  pb-8
                  mb-8
                  border-b border-[#F2F2F2]
                  "
                >
                  Perfect for using in a personal website or a client project.
                </p> */}
                {/* <div className="mb-7">
                  <p className="text-base text-body-color leading-loose mb-1">
                    1 User
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    All UI components
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Lifetime access
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Free updates
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Use on 1 (one) project
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    3 Months support
                  </p>
                </div> */}
                <div
                  className="whitespace-pre-wrap text-gray-600"
                  dangerouslySetInnerHTML={{ __html: pricing.description }}
                />
                <a
                  href=""
                  className={`
                    w-full
                    block
                    text-base
                    font-semibold
                    ${
                      index === 1
                        ? "text-white bg-blue-600"
                        : "text-blue-600 bg-transparent"
                    }
                    border border-blue-600
                    rounded-md
                    text-center
                    p-4
                    hover:text-white hover:bg-blue-600 hover:border-blue-600
                    transition
                    mt-8
                    `}
                >
                  Choose {pricing.name}
                </a>
                <div>
                  <span className="absolute right-0 top-7 z-[-1]">
                    <svg
                      width="77"
                      height="172"
                      viewBox="0 0 77 172"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="86"
                        cy="86"
                        r="86"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="86"
                          y1="0"
                          x2="86"
                          y2="172"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#3056D3" stopOpacity="0.09" />
                          <stop
                            offset="1"
                            stopColor="#C4C4C4"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="absolute right-4 top-4 z-[-1]">
                    <CornerAccent />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
