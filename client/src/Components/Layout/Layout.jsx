import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";

const Layout = ({ children,title,description,keyword,author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <meta name="description" content={description}/>
        <meta name="keyword" content={keyword}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "76vh" }}>{children}</main>
      <Footer />
      
    </div>
  );
};

Layout.defaultProps={
  title:"Ecommerce app - shop now",
  author:"Vikalp Nag",
  description:"mern stack project",
  keyword:"mern,react,nodejs,Mongodb"

}

export default Layout;
