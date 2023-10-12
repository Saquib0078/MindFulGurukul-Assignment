import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/Login.css'
const LoginPage = () => {
const navigate=useNavigate()
    const[loginData,setLoginData]=useState({
        email:'',
        password:''
    })
   
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
      };
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res= await axios.post('/api/login',loginData)
            const token=res.data.token
            localStorage.setItem('authToken', token);
            toast.success("Login successful!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              localStorage.setItem('token', token);
              
              setTimeout(()=>{
                navigate('/');
            },2000)
            
        } catch (error) {
            console.log(error)
        }
      };
  return (
   <div className='login-parent'>
     <div className='login-page'>
     <h3>Login Page</h3>

        <form onSubmit={handleSubmit}>
        <div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              required="true"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required="true"
              value={loginData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="btn-div">
          <button type="submit" className="btn-submit">
            Login
          </button>
        </div>
        </form>
        <div className="Login-link">
        <h4>
          <Link to="/signup" className="link">
            Don't Have An Account? Register
          </Link>
        </h4>
      </div>
      <ToastContainer/>
    </div>
   </div>
  )
}

export default LoginPage
