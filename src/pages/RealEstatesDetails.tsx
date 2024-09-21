import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import locationIcon from "../assets/locationIcon.png";
import bedIcon from "../assets/bedIcon.png";
import twoArrow from "../assets/twoArrow.png";
import zipIcon from "../assets/zipIcon.png";
import iconRight from "../assets/iconRight.png";
import { useNavigate } from "react-router-dom";
import email from "../assets/email.png";
import phone from "../assets/phone.png";
import { RootState } from "../store/store.js";
import { useSelector } from "react-redux";
import SliderEstates from "../components/SliderEstates";

interface City {
  id: number;
  name: string;
  region_id: number;
  region: {
    id: number;
    name: string;
  };
}

interface Agent {
  id: number;
  name: string;
  surname: string;
  email: string;
  avatar: string;
  phone: string;
}

interface EstateDetails {
  id: number;
  address: string;
  image: string;
  zip_code: string;
  description: string;
  price: number;
  bedrooms: number;
  area: number;
  is_rental: number;
  agent_id: number;
  city_id: number;
  created_at: string;
  city: City;
  agent: Agent;
}

const RealEstatesDetails = () => {
  const { id } = useParams();

  const realEstate = useSelector(
    (state: RootState) => state.realEstates.realEstates
  );
  const [estateDetails, setEstateDetails] = useState<EstateDetails | null>(
    null
  );
  const [deleteSubmittionIsOpen, setDeleteSubmittionIsOpen] =
    useState<boolean>(false);

  const [idToDelete, setIdToDelete] = useState<number | null | undefined>(null);

  console.log("idToDelete", idToDelete);
  const regionId = estateDetails?.city.region.id;
  const related = realEstate.filter(
    (estate) => estate.city.region_id === regionId
  );

  const navigate = useNavigate();

  const url = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`;
  const token = "9cfc36ff-e2fb-41a1-95c0-55773a2ca25f";

  useEffect(() => {
    const fetchEstate = async () => {
      try {
        const response = await axios.get(`${url}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setEstateDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEstate();
  }, [id]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const originalDate = estateDetails?.created_at;
  const formattedDate = formatDate(originalDate);

  const url2 = `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${idToDelete}`;

  const submitToDeleteClickHandler = () => {
    const deleteEstate = async () => {
      try {
        await axios.delete(`${url2}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };
    deleteEstate();
  };

  return (
    <div className="mt-[64px]  font-firaGo">
      {deleteSubmittionIsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className=" bg-white pl-[170px] pt-[58px] pr-[170px] pb-[58px] rounded-3xl">
            {/* <img src={xIcon} className="w-[16px] ml-auto absolute" /> */}
            <h1 className="text-center font-firaGo text-[20px] font-normal mb-[35px] ">
              გსურთ წაშალოთ ლისტინგი?
            </h1>
            <div className="flex gap-[15px]">
              <button
                onClick={() => {
                  setDeleteSubmittionIsOpen(false), setIdToDelete(null);
                }}
                className="px-[16px] py-[12px]  border border-textRed rounded-xl text-[16px] font-firaGo text-textRed font-medium"
              >
                გაუქმება
              </button>
              <button
                onClick={submitToDeleteClickHandler}
                className="px-[16px] py-[12px]  border bg-textRed rounded-xl text-[16px] font-firaGo text-white font-medium"
              >
                დადასტურება
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pl-[162px] ">
        <img
          onClick={() => navigate("/")}
          src={iconRight}
          className="w-8 h-8 mb-[30px] cursor-pointer"
        />
      </div>
      <div className="flex pl-[162px] gap-[68px]">
        {/* Image */}
        <div className="relative ">
          <div className="absolute text-white text-center text-[20px] left-[41px] top-[41px] bg-[#02152680] w-[142px] py-[8px] rounded-full font-medium tracking-wider">
            {estateDetails?.is_rental === 0 ? "ქირავდება" : "იყიდება"}
          </div>
          <img
            className="w-[839px] h-[670px] rounded-xl "
            key={estateDetails?.id}
            src={estateDetails?.image}
            alt={"Region Image"}
          />
          <div className="flex mt-1">
            <div className="ml-auto text-[16px] text-[#808A93]">
              გამოქვეყნების თარიღის {formattedDate}
            </div>
          </div>
        </div>

        <div className="py-[20px]">
          {/* Price */}
          <div className="font-bold text-[48px]">
            {estateDetails?.price.toLocaleString("en-US").replace(/,/g, " ")}
            <span> ₾</span>
          </div>

          {/* Address */}
          <div className="flex text-[#021526B2] gap-[7px] items-center text-[24px] font-normal mb-[16px]">
            <img src={locationIcon} className="h-[22px]" />
            <div>{estateDetails?.city.name},</div>
            <div>{estateDetails?.address}</div>
          </div>

          {/* Area */}
          <div className="flex gap-[7px] items-center text-[#021526B2] mb-[16px]">
            <img src={twoArrow} className="h-[20px]" />
            <div className="text-[24px]">
              {`ფართი ${estateDetails?.area}`} <span>მ&sup2;</span>
            </div>
          </div>

          {/* Badroom */}
          <div className="flex gap-[7px] items-center text-[#021526B2] mb-[16px]">
            <img src={bedIcon} className="w-[24px] h-[24px]" />
            <div className="text-[24px]">{estateDetails?.bedrooms}</div>
          </div>

          {/* Zip */}
          <div className="flex gap-[7px] items-center text-[#021526B2] mb-[40px]">
            <img src={zipIcon} className="w-[22px] h-[22px]" />
            <div className="text-[24px]">{estateDetails?.zip_code}</div>
          </div>

          <p className="text-[16px] text-[#021526B2] mb-[35px] w-[503px]">
            {estateDetails?.description}
          </p>

          <div className="border pl-5 py-6 font-firaGo rounded-xl mb-[20px] w-[503px]">
            <div className="flex gap-[14px] items-center mb-[16px]">
              <div className=" overflow-hidden w-[72px] h-[72px]  rounded-full">
                <img
                  className="w-[72px] h-[85px]"
                  src={estateDetails?.agent.avatar}
                />
              </div>
              <div>
                <div className="flex gap-1 text-[16px]">
                  <div>{estateDetails?.agent.name}</div>
                  <div>{estateDetails?.agent.surname}</div>
                </div>
                <div className="flex gap-1 text-[14px] text-[#021526B2]">
                  აგენტი
                </div>
              </div>
            </div>
            <div>
              <div className="text-[#021526B2] flex items-center gap-[5px]">
                <img className="w-[16px] h-[13px]" src={email} />
                <div className="text-[14px]">{estateDetails?.agent.email}</div>
              </div>
              <div className="text-[#021526B2] flex items-center gap-[5px]">
                <img className="w-[13px] h-[13px]" src={phone} />
                <div className="text-[14px]">{estateDetails?.agent.phone}</div>
              </div>
            </div>
          </div>
          <div
            onClick={() => {
              setIdToDelete(estateDetails?.id), setDeleteSubmittionIsOpen(true);
            }}
            className="border border-[#676E76] p-[10px] rounded-xl w-[131px] whitespace-nowrap cursor-pointer text-[#676E76] hover:text-white hover:bg-[#676E76]"
          >
            <div className="text-[12px] font-medium ">ლისტინგის წაშლა</div>
          </div>
        </div>
      </div>
      <div className="mt-[67px] px-[162px]">
        <SliderEstates related={related} />
      </div>
    </div>
  );
};

export default RealEstatesDetails;
