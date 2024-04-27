import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import './register.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();


    //register functionality with backend verification
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });

      // Check if response exists
      if (res) {
        // Check if registration was successful
        if (res.data.success) {
          toast.success("Registered Successfully", { duration: 10000 });
          navigate("/login");
        } else {
          toast.error(res.data.message, { duration: 10000 });
        }
      } else {
        // Handle network errors or unexpected response
        toast.error("Something went wrong with the request", { duration: 10000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 10000 });
    }
  }

  return (
    <Layout title="Register Now">
      <div className="reg">
        <h1>Register Page</h1>
        <form onSubmit={ handleSubmit }>
          <div className="mb-2">
            <input type="text" value={ name } onChange={ (e) => setName(e.target.value) } className='form-control' placeholder='name' required={true}/>
          </div>
          <div className="mb-2">
            <input type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control' placeholder='email' required={true}/>
          </div>
          <div className="mb-2">
            <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } className='form-control' placeholder='password' required={true}/>
          </div>
          <div className="mb-2">
            <input type="text" value={ phone } onChange={ (e) => setPhone(e.target.value) } className='form-control' placeholder='phone' required={true}/>
          </div>
          <div className="mb-2">
            <input type="text" value={ address } onChange={ (e) => setAddress(e.target.value) } className='form-control' placeholder='address' required={true}/>
          </div>
          <div className="mb-2">
            <input type="text" value={ answer } onChange={ (e) => setAnswer(e.target.value) } className='form-control' placeholder='What is Favorite sport' />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register;