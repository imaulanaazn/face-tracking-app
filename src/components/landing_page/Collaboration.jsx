import Link from "next/link";
import { collabApps, collabContent, collabText } from "../../lib/statics";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Collaboration = () => {
  return (
    <Section>
      <div id="the-benefits" className="container lg:flex">
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8 font-semibold text-gray-800">
            BOLO, Pantau Bisnis Dalam Genggaman
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item) => (
              <li className="mb-3 py-3" key={item.id}>
                <div className="flex items-center">
                  <Image
                    src={"/assets/check.svg"}
                    width={24}
                    height={24}
                    alt="check"
                  />
                  <h6 className="body-2 ml-5 font-medium text-gray-700">
                    {item.title}
                  </h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-gray-500">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Link href="/auth/register">
            <span className="button text-blue-600 hover:text-blue-400">
              Try it now
            </span>
          </Link>
        </div>

        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto">
            {collabText}
          </p>

          <div className="relative left-1/2 flex w-80 lg:w-[22rem] aspect-square border border-blue-600 rounded-full -translate-x-1/2 scale:75 md:scale-100">
            <div className="flex w-56 lg:w-60 aspect-square m-auto border border-blue-600 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                <div className="flex items-center justify-center w-full h-full bg-white rounded-full">
                  <Image
                    src={"/assets/brainwave-symbol.svg"}
                    width={48}
                    height={48}
                    alt="brainwave"
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-blue-400 border border-n-1/15 rounded-xl items-center justify-center text-white -rotate-${
                      index * 45
                    }`}
                  >
                    <FontAwesomeIcon icon={app.icon} className="text-xl" />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
