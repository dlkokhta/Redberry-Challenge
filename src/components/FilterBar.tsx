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
  const [areaCategoryIsOpen, setAreaCategoryIsOpen] = useState<boolean>(false);
  const [bedroomCategoryIsOpen, setBedroomCategoryIsOpen] =
    useState<boolean>(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selectedMinArea, setSelectedMinArea] = useState<number | null>(null);
  const [selectedMaxArea, setSelectedMaxArea] = useState<number | null>(null);
  const [selectedBedroom, setSelectedBedroom] = useState<number | null>(null);

  const { register, handleSubmit, setValue, reset } = useForm();

  const navigate = useNavigate();
  const regions = useSelector((state: RootState) => state.region.region);

  const regionCategoryClickHandler = () => {
    setRegionMenuIsOpen((prev) => !prev);
    setPriceCategoryIsOpen(false);
    setAreaCategoryIsOpen(false);
    setBedroomCategoryIsOpen(false);
  };
  const priceCategoryClickHandler = () => {
    setPriceCategoryIsOpen((prev) => !prev);
    setRegionMenuIsOpen(false);
    setAreaCategoryIsOpen(false);
    setBedroomCategoryIsOpen(false);
  };

  const areaCategoryClickHandler = () => {
    setAreaCategoryIsOpen((prev) => !prev);
    setRegionMenuIsOpen(false);
    setPriceCategoryIsOpen(false);
    setBedroomCategoryIsOpen(false);
  };

  const bedroomCategoryClickHandler = () => {
    setBedroomCategoryIsOpen((prev) => !prev);
    setRegionMenuIsOpen(false);
    setPriceCategoryIsOpen(false);
    setAreaCategoryIsOpen(false);
  };

  const regionsOnsubmit = (data: any) => {
    setSelectedRegions(data.regions);
    localStorage.setItem("selectedRegions", JSON.stringify(data.regions));
    setRegionMenuIsOpen(false);
    reset();
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
    const storedMinArea = localStorage.getItem("selectedMinArea");
    const storedMaxArea = localStorage.getItem("selectedMaxArea");
    const storedBedroom = localStorage.getItem("selectedBedroom");

    if (storedRegions) {
      setSelectedRegions(JSON.parse(storedRegions));
    }

    if (storedMinPrice) {
      setMinPrice(JSON.parse(storedMinPrice));
    }

    if (storedMaxPrice) {
      setMaxPrice(JSON.parse(storedMaxPrice));
    }

    if (storedMinArea) {
      setSelectedMinArea(JSON.parse(storedMinArea));
    }

    if (storedMaxArea) {
      setSelectedMaxArea(JSON.parse(storedMaxArea));
    }
    if (storedBedroom) {
      setSelectedBedroom(JSON.parse(storedBedroom));
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
    setPriceCategoryIsOpen(false);
    reset();
  };

  const areaCategoryOnsubmit = (data: any) => {
    setSelectedMinArea(data.minArea);
    setSelectedMaxArea(data.maxArea);
    localStorage.setItem("selectedMinArea", JSON.stringify(data.minArea));
    localStorage.setItem("selectedMaxArea", JSON.stringify(data.maxArea));
    setAreaCategoryIsOpen(false);
    reset();
  };

  const bedroomCategoryOnsubmit = (data: any) => {
    setSelectedBedroom(data.bedroom);
    localStorage.setItem("selectedBedroom", JSON.stringify(data.bedroom));
    setBedroomCategoryIsOpen(false);
    reset({
      bedroom: "",
    });
  };

  return (
    <>
      <div className="flex font-firaGo mt-[77px] items-center">
        <div className="flex items-center border p-[6px] rounded-xl gap-[24px]">
          {/* Region */}
          <form onSubmit={handleSubmit(regionsOnsubmit)} className="relative">
            <div
              onClick={regionCategoryClickHandler}
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
                    // onClick={() => setPriceCategoryIsOpen(false)}
                    type="submit"
                    className="font-firaGo text-[14px] font-medium text-white bg-textRed py-2 px-[14px] rounded-xl "
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Area */}

          <form
            onSubmit={handleSubmit(areaCategoryOnsubmit)}
            className="relative"
          >
            <div
              onClick={areaCategoryClickHandler}
              className={`flex items-center gap-1 px-[14px] py-[8px]  ${
                areaCategoryIsOpen ? "bg-filterBarButtonGray" : ""
              } rounded-xl cursor-pointer`}
            >
              <div className=" text-base font-medium">ფართობი</div>

              <img
                src={areaCategoryIsOpen ? arrowUp : arrowDown}
                className="w-[14px]"
              />
            </div>

            {areaCategoryIsOpen && (
              <div className="absolute border top-14 z-20 bg-white p-[24px] w-[382px] rounded-xl">
                <h2 className=" text-base font-medium mb-[24px] ]">
                  ფართობის მიხედვით
                </h2>
                <div className="flex gap-[15px] flex-row">
                  <div className="w-full relative">
                    <input
                      className="border border-[#808A93] w-full px-[10px] py-[12.5px] text-[14px] text-[#2D3648] rounded-xl"
                      placeholder="დან"
                      {...register("minArea")}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#2D3648] ">
                      მ&sup2;
                    </span>
                  </div>
                  <div className="w-full relative">
                    <input
                      className="border border-[#808A93] w-full px-[10px] py-[12.5px] text-[14px] rounded-xl text-[#2D3648] "
                      placeholder="დან"
                      {...register("maxArea")}
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 ">
                      მ&sup2;
                    </span>
                  </div>
                </div>
                <div className="mt-[24px] flex  gap-[113px] ">
                  <div className="text-[14px]">
                    <h3 className=" font-medium mb-[16px]">მინ. მ&sup2;</h3>
                    <div className="flex flex-col gap-[6px] text-[14px] font-normal text-[#2D3648]">
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minArea", "50000")}
                      >
                        50,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minArea", "100000")}
                      >
                        100,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minArea", "150000")}
                      >
                        150,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minArea", "200000")}
                      >
                        200,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("minArea", "300000")}
                      >
                        300,000 მ&sup2;
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px]">
                    <h3 className="font-medium mb-[16px]">მაქს. მ&sup2;</h3>
                    <div className="flex flex-col gap-[6px] text-[14px] font-normal ">
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxArea", "50000")}
                      >
                        50,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxArea", "100000")}
                      >
                        100,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxArea", "150000")}
                      >
                        150,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxArea", "200000")}
                      >
                        200,000 მ&sup2;
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setValue("maxArea", "300000")}
                      >
                        300,000 მ&sup2;
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

          {/* Bedrooms */}
          <form
            onSubmit={handleSubmit(bedroomCategoryOnsubmit)}
            className="relative"
          >
            <div
              onClick={bedroomCategoryClickHandler}
              className={`flex items-center gap-1 px-[14px] py-[8px]  ${
                bedroomCategoryIsOpen ? "bg-filterBarButtonGray" : ""
              } rounded-xl cursor-pointer`}
            >
              <div className=" text-base font-medium">
                საძინებლების რაოდენობა
              </div>

              <img
                src={bedroomCategoryIsOpen ? arrowUp : arrowDown}
                className="w-[14px]"
              />
            </div>

            {bedroomCategoryIsOpen && (
              <div className="absolute border top-14 z-20 bg-white p-[24px] w-[282px] rounded-xl">
                <h2 className=" text-base font-medium mb-[24px] ]">
                  საძინებლების რაოდენობა
                </h2>
                <div
                  onClick={() => setValue("bedroom", "2")}
                  className="cursor-pointer w-[41px] border text-[16px] text-[#02152666] px-[10px] py-[11px] text-center rounded-xl border-[#808A93]"
                >
                  2
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
            <input type="hidden" {...register("bedroom")} />
          </form>
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
      <div className="mt-[16px] flex gap-2 flex-wrap absolute">
        {/* Region */}
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

        {/* Area */}
        {selectedMaxArea && selectedMaxArea && (
          <div className="flex gap-1 items-center border border-[#DBDBDB] rounded-full px-[10px] py-[6px]">
            <div className="text-[14px]">
              {selectedMinArea} მ&sup2; - {selectedMaxArea} მ&sup2;
            </div>
            <img
              className="w-[14px] h-[14px] cursor-pointer"
              src={xIcon}
              onClick={() => {
                setSelectedMinArea(null);
                setSelectedMaxArea(null);
                localStorage.removeItem("selectedMinArea");
                localStorage.removeItem("selectedMaxArea");
              }}
              alt="Remove area category"
            />
          </div>
        )}
        {/* Price */}
        {minPrice && maxPrice && (
          <div className="flex gap-1 items-center border border-[#DBDBDB] rounded-full px-[10px] py-[6px]">
            <div className="text-[14px]">
              {minPrice}₾ - {maxPrice}₾
            </div>
            <img
              className="w-[14px] h-[14px] cursor-pointer"
              src={xIcon}
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

        {/* Bedroom */}
        {selectedBedroom && (
          <div className="flex gap-1 items-center border border-[#DBDBDB] rounded-full px-[10px] py-[6px]">
            <div className="text-[14px]">{selectedBedroom} საძინებელი</div>
            <img
              className="w-[14px] h-[14px] cursor-pointer"
              src={xIcon}
              onClick={() => {
                setSelectedBedroom(null);
                localStorage.removeItem("selectedBedroom");
              }}
              alt="Remove bedroom selection"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default FilterBar;
