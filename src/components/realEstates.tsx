import { RootState } from "../store/store.js";
import { useSelector } from "react-redux";
import locationIcon from "../assets/locationIcon.png";
import bedIcon from "../assets/bedIcon.png";
import twoArrow from "../assets/twoArrow.png";
import zipIcon from "../assets/zipIcon.png";

const realEstates = () => {
  const realEstate = useSelector(
    (state: RootState) => state.realEstates.realEstates
  );

  return (
    <div className="mt-20 grid grid-cols-4 gap-5 font-firaGo">
      {realEstate.map((realEstate: any, index) => (
        <div className="border rounded-2xl overflow-hidden" key={index}>
          {/* Image */}
          <div className="relative ">
            <div className="absolute text-white text-center text-xs left-[23px] top-[23px] bg-[#02152680] w-[90px] py-[8px] rounded-2xl font-medium tracking-wider">
              {realEstate.is_rental === 0 ? "ქირავდება" : "იყიდება"}
            </div>
            <img
              className="w-full h-[307px]"
              key={realEstate.id}
              src={realEstate.image}
              alt={realEstate.name || "Region Image"}
            />
          </div>

          <div className="pl-[25px] py-[22px]">
            {/* Price */}
            <div className="font-bold text-[28px]">
              {realEstate.price.toLocaleString("en-US").replace(/,/g, " ")}
              <span> ₾</span>
            </div>

            {/* Address */}
            <div className="flex text-[#021526B2] gap-1 items-center text-[16px] font-normal mb-5">
              <img src={locationIcon} className="w-[14px] h-[17px]" />
              <div>{realEstate.city.name},</div>
              <div>{realEstate.address}</div>
            </div>

            {/* Area */}
            <div className="flex text-[#021526B2] gap-8">
              <div className="flex gap-1">
                <img src={bedIcon} className="w-[24px]" />
                <div>{realEstate.bedrooms}</div>
              </div>

              <div className="flex gap-1 items-center">
                <img src={twoArrow} className="w-[18px] h-[18px]" />
                <div>
                  {realEstate.area} <span>მ &sup2;</span>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <img src={zipIcon} className="w-[16px] h-[18px]" />
                <div>{realEstate.zip_code}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default realEstates;
