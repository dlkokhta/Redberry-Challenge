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
import { setRealEstates } from "./store/realEstatesSlice";

function App() {
  const dispatch = useDispatch();
  const regionsUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/regions/";

  useEffect(() => {
    const fetchregions = async () => {
      try {
        const response = await axios.get(`${regionsUrl}`);
        dispatch(setRegion(response.data));
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

  const realEstatesUrl =
    "https://api.real-estate-manager.redberryinternship.ge/api/real-estates/";

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await axios.get(`${realEstatesUrl}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setRealEstates(response.data));
        console.log("realEsttes", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRealEstates();
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addListing" element={<AddListingPage />} />
      </Routes>
    </>
  );
}

export default App;
