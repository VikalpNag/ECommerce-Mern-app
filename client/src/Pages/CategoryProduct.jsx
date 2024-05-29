import React, { useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState();
  const [category, setCategory] = useState();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="text-center">{category?.name}</div>
      </div>
    </Layout>
  );
};
export default CategoryProduct;
