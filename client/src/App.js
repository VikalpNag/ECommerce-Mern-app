import Layout from "./Components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import HomePage from "./Pages/HomePage.jsx";
import PageNotFound from "./Pages/PageNotFound";
import Policy from "./Pages/Policy.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
