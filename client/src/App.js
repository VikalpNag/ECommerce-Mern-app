import { Routes, Route } from "react-router-dom";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import HomePage from "./Pages/HomePage.jsx";
import PageNotFound from "./Pages/PageNotFound";
import Policy from "./Pages/Policy.jsx";
import Register from "./Pages/Auth/Register.jsx";
import Login from "./Pages/Auth/Login .jsx"
import Dashboard from "./Pages/users/Dashboard.jsx";
import PrivateRoute from "./Components/Routes/Private.jsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword.jsx";
import { AdminRoute } from "./Components/Routes/AdminRoute.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import CreateCategory from "../src/Pages/Admin/CreateCategory.jsx";
import CreateProduct from "../src/Pages/Admin/CreateProduct.jsx";
import Users from "./Pages/Admin/Users.jsx";
import Profile from "./Pages/users/Profile.jsx";
import Order from "./Pages/users/Order.jsx";
import Products from '../src/Pages/Admin/Products.jsx'
import UpdateProduct from "./Pages/Admin/updateProduct.jsx";
import Search from "./Pages/Search.jsx";
import ProductDetails from './Pages/ProductDetails.jsx';
import Categories from './Pages/Categories.jsx'

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
        <Route path="/forgot-password" element={ <ForgotPassword /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/product/:slug" element={ <ProductDetails /> } />
        <Route path="/categories" element={ <Categories /> } />

        <Route path="/dashboard" element={ <PrivateRoute /> }>
          <Route path="user" element={ <Dashboard /> } />
          <Route path="user/profile" element={ <Profile /> } />
          <Route path="user/order" element={ < Order /> } />
        </Route>

        <Route path="/dashboard" element={ <AdminRoute /> }>
          <Route path="admin" element={ <AdminDashboard /> } />
          <Route path="admin/create-category" element={ <CreateCategory /> } />
          <Route path="admin/create-product" element={ <CreateProduct /> } />
          <Route path="admin/products" element={ <Products /> } />
          <Route path="admin/product/:slug" element={ <UpdateProduct /> } />
          <Route path="admin/users" element={ <Users /> } />
        </Route>

      </Routes>
    </>
  );
}

export default App;
