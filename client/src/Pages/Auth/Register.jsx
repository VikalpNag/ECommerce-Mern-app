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
  const navigate = useNavigate();

  //form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, password, phone, address);

    //register functionality with backend verification
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address });
      if (res && res.data.success) {
        toast.success("Registered Successfully", { autoClose: false });
        navigate("/login");

      } else {
        toast.error(res.data.message, { duration: 10000 });
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { duration: 10000 })
    }
  }

  return (
    <Layout title="Register Now">
      <div className="reg">
        <h1>Register Page</h1>
        <form onSubmit={ handleSubmit }>
          <div className="mb-2">
            <input type="text" value={ name } onChange={ (e) => setName(e.target.value) } className='form-control' placeholder='name' />
          </div>
          <div className="mb-2">
            <input type="email" value={ email } onChange={ (e) => setEmail(e.target.value) } className='form-control' placeholder='email' />
          </div>
          <div className="mb-2">
            <input type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } className='form-control' placeholder='password' />
          </div>
          <div className="mb-2">
            <input type="text" value={ phone } onChange={ (e) => setPhone(e.target.value) } className='form-control' placeholder='phone' />
          </div>
          <div className="mb-2">
            <input type="text" value={ address } onChange={ (e) => setAddress(e.target.value) } className='form-control' placeholder='address' />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>

      </div>
    </Layout>
  )
}

export default Register;