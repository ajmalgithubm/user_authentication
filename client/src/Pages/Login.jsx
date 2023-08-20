import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import style from '../Style/Login.module.css'
import {ToastContainer, toast} from 'react-toastify'

const Login = () => {

  const [inputValue, setInputValue] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  // destructring inputValue object
  const { email, password } = inputValue;

  // trigger it change value of the input field
  const handOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value
    })
  }

  // function trigger when form submit
  const handOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/login",
        {
          ...inputValue
        }, {
          withCredentials:true
      });
      const {success, message} = data;
      if(success){
        toast.success(message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() =>{
          navigate('/')
        },3000)
      }else{
        toast.error(message, {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

    } catch (err) {
      console.error(err)
    }
    setInputValue({
      email:"",
      password:""
    })
  }
  return (
    <div className={style.mainContainer}>
     
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className={style.formContainer}>
        <h2>Login account</h2>
        <form autoComplete='off' onSubmit={(e) => handOnSubmit(e)} >
          <div className={style.inputGroup}>
            <input type="email" name="email" value={email} id="email" required onChange={handOnChange} />
            <label htmlFor="email">Email</label>
          </div>

          <div className={style.inputGroup}>
            <input type="password" name="password" value={password} id="password" required onChange={handOnChange} />
            <label htmlFor="password">Password</label>
          </div>
          <div className={style.inputGroup}>
            <input type="submit" value="Login" className={style.submitButton} />
          </div>
          <p className={style.createAccount}>
            Create new account <Link to={"/signup"}>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
