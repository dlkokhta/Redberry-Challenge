import AddAgent from "../components/AddAgent";
import { useState } from "react";
import RealEstates from "../components/realEstates";
import FilterBar from "../components/FilterBar";

const HomePage = () => {
  const [isAgentWindowOpen, setIsAgentWindowOpen] = useState<boolean>(false);
  console.log("isAgentWindowOpen", isAgentWindowOpen);
  return (
    <div className="px-[162px]">
      {isAgentWindowOpen && (
        <AddAgent setIsAgentWindowOpen={setIsAgentWindowOpen} />
      )}
      <FilterBar setIsAgentWindowOpen={setIsAgentWindowOpen} />
      <RealEstates />
    </div>
  );
};

export default HomePage;
