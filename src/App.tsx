import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/home/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Navbar cartCount={0} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/shop" element={<Shop />} />

        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-[#fbf3e7] p-10">About page</div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-[#fbf3e7] p-10">Contact page</div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
