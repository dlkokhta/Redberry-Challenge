import whitePlus from "../assets/whitePlus.png";
import redPlus from "../assets/redPlus.png";
import HomePageButtons from "../components/HomePageButtons";
import { useNavigate } from "react-router-dom";

const FilterBar = ({ setIsAgentWindowOpen }: any) => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div>რეგიონი</div>
      <div>საფასო კატეგორია</div>
      <div>ფართობი</div>
      <div>საძინებლების რაოდენობა</div>

      <div className="flex gap-4">
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
  );
};
export default FilterBar;
