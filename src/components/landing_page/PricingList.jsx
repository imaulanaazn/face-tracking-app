import { check } from "../../../public/assets";
import { pricing } from "../../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-8 max-lg:flex-wrap">
      {pricing.map((item) => (
        <div
          className="bg-conic-gradient p-0.25 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3 rounded-[2rem]"
          key={item.id}
        >
          <div className="w-[19rem] max-lg:w-full h-full px-6 bg-white shadow-md rounded-[2rem] lg:w-auto even:py-14 odd:py-8">
            <h4 className="h4 mb-4">{item.title}</h4>

            <p className="body-2 min-h-[4rem] mb-3 text-gray-500">
              {item.description}
            </p>

            <div className="flex items-center h-[5.5rem] mb-6">
              {item.price && (
                <>
                  <div className="h3">$</div>
                  <div className="text-[5.5rem] leading-none font-bold">
                    {item.price}
                  </div>
                </>
              )}
            </div>

            <Button
              className="w-full mb-6"
              href={item.price ? "/pricing" : "mailto:contact@jsmastery.pro"}
              white={!!item.price}
            >
              {item.price ? "Get started" : "Contact us"}
            </Button>

            <ul>
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start py-5 border-t border-n-6"
                >
                  <img
                    src={"assets/check.svg"}
                    width={24}
                    height={24}
                    alt="Check"
                  />
                  <p className="body-2 ml-4">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
