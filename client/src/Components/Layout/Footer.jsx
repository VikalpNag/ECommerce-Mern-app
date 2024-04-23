import React from "react";
import {Link} from "react-router-dom";


const Footer = () => {
  return (
    <div className="bg-dark text-light p-3">
      <h4 className="text-center fs-20">All rights reserverd &copy; Vikalp Nag</h4>
      <p className="text-center mt-3 a">
        <Link to="/about" className="links">About | </Link>
        <Link to="/contact" className="links">Contact | </Link>
        <Link to="/policy" className="links">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
