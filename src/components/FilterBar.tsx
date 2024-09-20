import whitePlus from "../assets/whitePlus.png";
import redPlus from "../assets/redPlus.png";
import HomePageButtons from "../components/HomePageButtons";
import { useNavigate } from "react-router-dom";
import arrowDown from "../assets/arrowDown.png";
import arrowUp from "../assets/arrowUp.png";
import { RootState } from "../store/store.js";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import xIcon from "../assets/xIcon.png";

const FilterBar = ({ setIsAgentWindowOpen }: any) => {
  const [regionMenuIsOpen, setRegionMenuIsOpen] = useState<boolean>(false);

  const [priceCategoryIsOpen, setPriceCategoryIsOpen] =
    useState<boolean>(false);

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState<number | null>(null);
  console.log("minPrice", minPrice);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  console.log("maxPrice", maxPrice);

  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();
  const regions = useSelector((state: RootState) => state.region.region);

  const regionClickHandler = () => {
    setRegionMenuIsOpen((prev) => !prev);
  };
  const priceCategoryClickHandler = () => {
    setPriceCategoryIsOpen((prev) => !prev);
  };

  const regionsOnsubmit = (data: any) => {
    setSelectedRegions(data.regions);
    localStorage.setItem("selectedRegions", JSON.stringify(data.regions));
  };

  useEffect(() => {
    const storedRegions = localStorage.getItem("selectedRegions");
    if (storedRegions) {
      setSelectedRegions(JSON.parse(storedRegions));
    }
  }, []);

  useEffect(() => {
    const storedRegions = localStorage.getItem("selectedRegions");
    const storedMinPrice = localStorage.getItem("selectedMinPrice");
    const storedMaxPrice = localStorage.getItem("selectedMaxPrice");

    if (storedRegions) {
      setSelectedRegions(JSON.parse(storedRegions));
    }

    if (storedMinPrice) {
      setMinPrice(JSON.parse(storedMinPrice));
    }

    if (storedMaxPrice) {
      setMaxPrice(JSON.parse(storedMaxPrice));
    }
  }, []);

  const removeRegion = (regionToRemove: string) => {
    const updatedRegions = selectedRegions.filter(
      (region) => region !== regionToRemove
    );
    setSelectedRegions(updatedRegions);
    localStorage.setItem("selectedRegions", JSON.stringify(updatedRegions));
  };

  const priceCategoryOnsubmit = (data: any) => {
    setMinPrice(data.minPrice);
    setMaxPrice(data.maxPrice);
    localStorage.setItem("selectedMinPrice", JSON.stringify(data.minPrice));
    localStorage.setItem("selectedMaxPrice", JSON.stringify(data.maxPrice));
  };

  return (
    <>
      <div className="flex font-firaGo mt-[77px] items-center">
        <div className="flex items-center border p-[6px] rounded-xl gap-[24px]">
          {/* Region */}
          <form onSubmit={handleSubmit(regionsOnsubmit)} className="relative">
            <div
              onClick={regionClickHandler}
              className={`flex items-center gap-1 px-[14px] py-[8px]  ${
                regionMenuIsOpen ? "bg-filterBarButtonGray" : ""
              } rounded-xl cursor-pointer`}
            >
              <div className=" text-base font-medium">რეგიონი</div>

              <img
                src={regionMenuIsOpen ? arrowUp : arrowDown}
                className="w-[14px]"
              />
            </div>

            {regionMenuIsOpen && (
              <div className="left-[-7px] absolute border top-14 z-20 bg-white p-[24px]  w-[731px] rounded-xl">
                <h2 className=" text-base font-medium mb-[24px] ]">
                  რეგიონის მიხედვით
                </h2>
                <div className="grid grid-cols-3 gap-x-20 gap-y-4">
                  {regions.map((region: any) => (
                    <div className="grid grid-col-3" key={region.name}>
                      <div className="flex gap-2 ">
                        <input
                          type="checkbox"
                          className=" accent-checkBoxGreen w-[20px] h-[20px] cursor-pointer"
                          {...register("regions")}
                          value={region.name}
                        />
                        <div className="text-[14px] font-normal font-firaGo">
                          {region.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-[32px]">
                  <button
                    type="submit"
                    className="font-firaGo text-[14px] font-medium text-white bg-textRed py-2 px-[14px] rounded-xl "
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Price Range */}

          <form
            onSubmit={handleSubmit(priceCategoryOnsubmit)}
            className="relative"
          >
            <div
              onClick={priceCategoryClickHandler}
              className={`flex items-center gap-1 px-[14px] py-[8px]  ${
                priceCategoryIsOpen ? "bg-filterBarButtonGray" : ""
              } rounded-xl cursor-pointer`}
            >
              <div className=" text-base font-medium">საფასო კატეგორია</div>

              <img
                src={priceCategoryIsOpen ? arrowUp : arrowDown}
                className="w-[14px]"
              />
            </div>

            {priceCategoryIsOpen && (
              <div className="absolute border top-14 z-20 bg-white p-[24px] w-[382px] rounded-xl">
                <h2 className=" text-base font-medium mb-[24px] ]">
                  ფასის მიხედვით
                </h2>
                <div className="flex gap-[15px] flex-row">
                  <div className="w-full relative">
                    <input
                      className="border border-[#808A93] w-full px-[10px] py-[12.5px] text-[14px] text-[#2D3648] rounded-xl"
                      placeholder="დან"
                      {...register("minPrice")}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#2D3648] ">
                      ₾
                    </span>
                  </div>
                  <div className="w-full relative">
                    <input
                      className="border border-[#808A93] w-full px-[10px] py-[12.5px] text-[14px] rounded-xl text-[#2D3648] "
                      placeholder="დან"
                      {...register("maxPrice")}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
                      ₾
                    </span>
                  </div>
                </div>
                <div className="mt-[24px] flex  gap-[113px] ">
                  <div className="text-[14px]">
                    <h3 className=" font-medium mb-[16px]">მინ.ფასი</h3>
                    <div className="flex flex-col gap-[6px] text-[14px] font-normal text-[#2D3648]">
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minPrice", "50000")}
                      >
                        50,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minPrice", "100000")}
                      >
                        100,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minPrice", "150000")}
                      >
                        150,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minPrice", "200000")}
                      >
                        200,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minPrice", "300000")}
                      >
                        300,000 ₾
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px]">
                    <h3 className="font-medium mb-[16px]">მაქს. ფასი</h3>
                    <div className="flex flex-col gap-[6px] text-[14px] font-normal ">
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxPrice", "50000")}
                      >
                        50,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxPrice", "100000")}
                      >
                        100,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxPrice", "150000")}
                      >
                        150,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxPrice", "200000")}
                      >
                        200,000 ₾
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxPrice", "300000")}
                      >
                        300,000 ₾
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-[32px]">
                  <button
                    type="submit"
                    className="font-firaGo text-[14px] font-medium text-white bg-textRed py-2 px-[14px] rounded-xl "
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            )}
          </form>

          <div>ფართობი</div>

          <div>საძინებლების რაოდენობა</div>
        </div>

        <div className="flex gap-4 ml-auto">
          <HomePageButtons
            image={whitePlus}
            title="ლისტინგის დამატება"
            bgColor="bg-textRed"
            textColor="text-white"
            onClick={() => navigate("/addListing")}
          />

          <HomePageButtons
            image={redPlus}
            title="აგენტის დამატება"
            bgColor="bg-white"
            textColor="text-textRed"
            borderColor="border-textRed"
            onClick={() => setIsAgentWindowOpen(true)}
          />
        </div>
      </div>
      <div className="mt-[16px] flex gap-2 flex-wrap">
        {selectedRegions.map((region) => (
          <div
            key={region}
            className="flex gap-1 items-center border border-[#DBDBDB] rounded-full px-[10px] py-[6px]"
          >
            <div className="text-[14px]">{region}</div>
            <img
              className="w-[14px] h-[14px] cursor-pointer"
              src={xIcon}
              onClick={() => removeRegion(region)}
              alt="Remove region"
            />
          </div>
        ))}

        {minPrice && maxPrice && (
          <div className="flex gap-1 items-center border border-[#DBDBDB] rounded-full px-[10px] py-[6px]">
            <div className="text-[14px]">
              {minPrice}₾ - {maxPrice}₾
            </div>
            <img
              className="w-[14px] h-[14px] cursor-pointer"
              src={xIcon} // Replace with your close icon
              onClick={() => {
                setMinPrice(null);
                setMaxPrice(null);
                localStorage.removeItem("selectedMinPrice");
                localStorage.removeItem("selectedMaxPrice");
              }}
              alt="Remove price category"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default FilterBar;
