import locationIcon from "../assets/locationIcon.png";
import bedIcon from "../assets/bedIcon.png";
import twoArrow from "../assets/twoArrow.png";
import zipIcon from "../assets/zipIcon.png";
import Slider from "react-slick";
import rightArrow from "../assets/rightArrow.png";
import leftArrow from "../assets/leftArrow.png";
import { useNavigate } from "react-router-dom";

const SliderEstates = ({ related }: any) => {
  const navigate = useNavigate();
  const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute top-[240px] right-[-60px] z-10 cursor-pointer"
      >
        <img src={rightArrow} alt="Next" className="w-[30px] h-[30px]" />
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        className="absolute top-[240px] left-[-60px] z-10 cursor-pointer"
      >
        <img src={leftArrow} alt="Previous" className="w-[30px] h-[30px]" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <>
      <h1 className="font-firaGo text-[32px] font-medium">
        ბინები მსგავს ლოკაციაზე
      </h1>

      <Slider {...settings} className="mt-[52px] mb-[] font-firaGo ">
        {related.map((realEstate: any, index: any) => (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden w-[384px]"
          >
            {/* Image */}
            <div className="relative ">
              <div className="absolute text-white text-center text-xs left-[23px] top-[23px] bg-[#02152680] w-[90px] py-[8px] rounded-2xl font-medium tracking-wider">
                {realEstate.is_rental === 0 ? "ქირავდება" : "იყიდება"}
              </div>
              <img
                onClick={() => navigate(`/RealEstatesDetails/${realEstate.id}`)}
                className="w-[384px]  h-[307px] cursor-pointer"
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
      </Slider>
    </>
  );
};

export default SliderEstates;
