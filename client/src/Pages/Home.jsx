import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import style from '../Style/Home.module.css'
import axios from 'axios'
const Home = () => {

  const [username, setUsername] = useState("");
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate()
  useEffect(() => {
    // vaerify cookie exist in client side and server
    const verifyCookie =async () => {
      if (!cookies.token) {
        navigate("/login")
      }
      const { data } =await axios.post("http://localhost:4000",
        {}, {
        withCredentials: true
      });
      console.log("data", data)
      const { status, user } = data;
      setUsername(user);
      return status ? toast.success(`Welcome ${user}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }) : (removeCookie("token"), navigate("/login"));
    }
    verifyCookie()
  }, [cookies, navigate, removeCookie])

  const Logout = () => {
    removeCookie("token")
    navigate('/signup')
  }

  return (
    <div className={style.mainContainer}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={style.HomeContainer}>
        <h2>Welcome <span>{username}</span></h2>
        <button onClick={Logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home
