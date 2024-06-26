import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../Components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All categories"}>
      <div className="container">
        <div className="row">
          {categories?.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <Link className="btn btn-primary" to={`/category/${c.slug}`}>
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Categories;
