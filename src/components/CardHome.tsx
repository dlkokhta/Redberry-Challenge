import axios from "axios";
import { useEffect, useState } from "react";

const CardHome = () => {
  const url =
    "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
  const token = process.env.REACT_APP_API_TOKEN;

  const [data, setData] = useState([]);
  console.log("response data", data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Cards page</h1>
    </div>
  );
};

export default CardHome;
