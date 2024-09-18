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
  const url =
    "https://api.real-estate-manager.redberryinternship.ge/api/cities/";

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${url}`);
        dispatch(setRegion(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
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
