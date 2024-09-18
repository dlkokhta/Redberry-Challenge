import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";
import axios from "axios";
import { useEffect } from "react";
import { setRegion } from "./store/regionsSlice";
import { setCities } from "./store/citiesSlice";
import { useDispatch } from "react-redux";
import { setAgents } from "./store/agentSlice";

function App() {
  const dispatch = useDispatch();
  const regionsUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/regions/";

  useEffect(() => {
    const fetchregions = async () => {
      try {
        const response = await axios.get(`${regionsUrl}`);
        dispatch(setRegion(response.data));
        console.log("region", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchregions();
  }, []);

  const citiesUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/cities/";

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${citiesUrl}`);
        dispatch(setCities(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  const agentsUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/agents/";
  const token = "9cfc36ff-e2fb-41a1-95c0-55773a2ca25f";

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${agentsUrl}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setAgents(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAgents();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AddListingPage" element={<AddListingPage />} />
      </Routes>
    </>
  );
}

export default App;
