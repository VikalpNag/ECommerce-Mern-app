import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login  = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[auth,setAuth]=useAuth();
  const navigate = useNavigate();
  const location =useLocation();

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log( email, password);

    //register functionality with backend verification
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password});
      if (res && res.data.success) {
        toast.success("Logged In Successfully");
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token,
        });
        localStorage.setItem("auth",JSON.stringify(res.data))
        navigate(location.state || "/");

      } else {
        toast.error("Something went wrong!");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (

      <Layout title="Login">
      <div className="reg">
        <h1>Login Page</h1>
        <form onSubmit={ handleSubmit } className='d-flex flex-column mb-3'>

          <div className="mb-2">
            <input type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control' placeholder='email' />
          </div>
          <div className="mb-2">
            <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } className='form-control' placeholder='password' />
          </div>
          <div className="mb-2 w-90">
          <button type='submit' className='btn btn-primary w-100' style={{ minWidth: '150px' }}>Login</button>
          </div>
          <div className="mb-2">
          <button type='submit' className='btn btn-secondary' onClick={()=>{
            navigate("/forgot-password");
          }}>Forgot password</button>
          </div>
        </form>

      </div>
    </Layout>

  )
}

export default Login 
