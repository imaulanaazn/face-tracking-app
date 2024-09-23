import { benefits } from "../../lib/statics";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../../../public/assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../../../public/assets/svg/ClipPath";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Benefits = () => {
  return (
    <Section id="features">
      <div
        className="container relative z-2 pt-10 xl:pb-20"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.2884803579634979) 0%, rgba(224,240,255,1) 66%, rgba(255,255,255,1) 100%)",
        }}
      >
        <Heading
          className="md:max-w-md lg:max-w-2xl font-semibold text-gray-800"
          title="BOLO, Cepat, Mudah dan Lengkap"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5 font-medium text-gray-800">
                  {item.title}
                </h5>
                <p className="body-2 mb-6 text-gray-600">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <FontAwesomeIcon
                    icon={item.iconUrl}
                    className="text-2xl text-gray-600"
                  />
                  <p className="ml-auto font-code text-xs font-bold uppercase tracking-wider text-gray-600">
                    Explore more
                  </p>
                  <Arrow />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-white"
                style={{ clipPath: "url(#benefits)" }}
              >
                {/* <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div> */}
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
