import React, { useEffect, useState } from 'react';
import '../../Styles/SignupPage.css';
import { Link,useNavigate } from 'react-router-dom';
import ApiCall from '../../Custom-Hook/ApiCall';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const { data, loading, error, postData, fetchData } = ApiCall();
    const navigate=useNavigate()
  const [enumValues, setEnumValues] = useState({
    gender: [],
    howDidYouHear: [],
    city: [],
    state: [],
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    howDidYouHear: [],
    city: '',
    state: '',
  });

  useEffect(() => {
    fetchData('/api/enum-values');
    if (data) {
        setEnumValues(data.enumValues);
      }
  }, [data]);

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === 'checkbox') {
      const isChecked = e.target.checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: isChecked
          ? [...prevData[name], value]
          : prevData[name].filter((item) => item !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        
        const res= await axios.post('/api/register',formData)
        toast.success(res.data.message+"Please Login", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(()=>{
            navigate('/login')

          },1000)

    } catch (error) {
        toast.error("Something went wrong", {
            position: toast.POSITION.TOP_RIGHT,
          });
    }
  };



  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-box">
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              required="true"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              name="email"
              required="true"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Mobile"
              name="phone"
              required="true"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              name="password"
              required="true"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Gender:</label>
          {enumValues&&enumValues.gender.map((option) => (
            <div key={option}>
              <input
                type="radio"
                name="gender"
                value={option}
                required="true"
                checked={formData.gender === option}
                onChange={handleInputChange}
              />
              {option}
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>How did you hear about this?</label>
          {enumValues&&enumValues.howDidYouHear.map((option) => (
            <div key={option}>
              <input
                type="radio"
                id={option}
                name="howDidYouHear"
                value={option}
                required="true"
                checked={formData.howDidYouHear===option}
                onChange={handleInputChange}
              />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
        <div className="city-state">
        <div>
            <label>State:</label>
            <select
              value={formData.state}
              onChange={handleInputChange}
              name="state"
              required="true"
            >
              <option value="">Select a state</option>
              {enumValues&&enumValues.state.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>City:</label>
            <select
              value={formData.city}
              onChange={handleInputChange}
              name="city"
              required="true"
            >
              <option value="">Select a city</option>
              {enumValues&&enumValues.city.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
         
        </div>
        <div className="btn-div">
          <button type="submit" className="btn-submit">
            {!loading?"Loading":"Signup"}
          </button>
        </div>
      </form>
      <div className="Login-link">
        <h4>
          <Link to="/login" className="link">
            Already Have An Account? Login
          </Link>
        </h4>
      </div>
      <ToastContainer/>

    </div>
  );
};

export default SignupPage;
