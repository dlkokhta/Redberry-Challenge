import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";
import axios from "axios";
import { useEffect } from "react";
import { setRegion } from "./store/regionsSlice";
import { useDispatch } from "react-redux";

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
    "https://api.real-estate-manager.redberryinternship.ge/api/regions/";

  useEffect(() => {
    const fetchregions = async () => {
      try {
        const response = await axios.get(`${citiesUrl}`);
        dispatch(setRegion(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchregions();
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
