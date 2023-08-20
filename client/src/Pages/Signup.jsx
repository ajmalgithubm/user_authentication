import React, { useState } from 'react'
import style from '../Style/Signup.module.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        username: ""
    })
    // destructring inputVlaue 
    const { email, password, username } = inputValue;

    // function trigger when input changing
    const handOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    // function trigger when submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('http://localhost:4000/signup',
                {
                    ...inputValue
                },
                { withCredentials: true }
            );
            const {success, message} = data;
            if(success){
                toast.success(message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate('/')
                }, 3000)
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
            console.log(err)
        }
        setInputValue({
            email:"",
            password:"",
            username:""
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
                theme="light"
            />
            <div className={style.formContainer}>
                <h2>Signup form</h2>
                <form autoComplete='off' onSubmit={(event) => handleSubmit(event)}>
                    <div className={style.inputGroup}>
                        <input type="email" name="email" id="email" value={email} onChange={handOnChange} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={style.inputGroup}>
                        <input type="text" name="username" id="username" value={username} onChange={handOnChange} required />
                        <label htmlFor="username">Username</label>
                    </div>
                    <div className={style.inputGroup}>
                        <input type="password" name="password" id="password" value={password} onChange={handOnChange} required />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className={style.inputGroup}>
                        <input type="submit" className={style.submitButton} />
                    </div>
                    <p className={style.createAccount}>
                        Already have an account? <Link to={"/login"}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
