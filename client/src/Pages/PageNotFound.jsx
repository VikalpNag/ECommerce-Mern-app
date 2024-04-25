import React from "react";
import Layout from "../Components/Layout/Layout";
import { Link } from "react-router-dom";
import "./css/PageNotFound.css"

const PageNotFound = () => {
  return (
    <Layout title="Page not found !">
      <div className="pnf">
        <div className="pnf-title">404</div>
        <div className="pnf-heading">Oops! Page does'nt found</div>
        <Link to ="/" className="pnf-btn">GO BACK</Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
