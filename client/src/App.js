import { Routes, Route } from "react-router-dom";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import HomePage from "./Pages/HomePage.jsx";
import PageNotFound from "./Pages/PageNotFound";
import Policy from "./Pages/Policy.jsx";
import Register from "./Pages/Auth/Register.jsx";
import Login from "./Pages/Auth/Login .jsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/" element={ <HomePage /> } />
        <Route path="/policy" element={ <Policy /> } />
        <Route path="*" element={ <PageNotFound /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </>
  );
}

export default App;
