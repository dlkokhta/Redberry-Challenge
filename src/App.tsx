import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";

function App() {
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
