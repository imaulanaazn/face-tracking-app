import { notification1 } from "../../../public/assets";
import { notificationImages } from "../../lib/statics";

const Notification = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-blue-600/40 backdrop-blur border border-n-1/10 rounded-xl md:rounded-2xl gap-5`}
    >
      <img
        src={"/assets/notification/image-1.png"}
        width={62}
        height={62}
        alt="image"
        className="rounded-xl"
      />

      <div className="flex-1">
        <h6 className="mb-1 font-semibold text-base">{title}</h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            {notificationImages.map((item, index) => (
              <li
                key={index}
                className="flex w-6 h-6 border-2 border-n-12 rounded-full overflow-hidden"
              >
                <img
                  src={item}
                  className="w-full"
                  width={20}
                  height={20}
                  alt={item}
                />
              </li>
            ))}
          </ul>
          <div className="body-2 text-white">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
