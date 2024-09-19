import AddAgent from "../components/AddAgent";
import { useState } from "react";

const HomePage = () => {
  const [isAgentWindowOpen, setIsAgentWindowOpen] = useState<boolean>(false);
  console.log("isAgentWindowOpen", isAgentWindowOpen);
  return (
    <div>
      {isAgentWindowOpen && (
        <AddAgent setIsAgentWindowOpen={setIsAgentWindowOpen} />
      )}
    </div>
  );
};

export default HomePage;
