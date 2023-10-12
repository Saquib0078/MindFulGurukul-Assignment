import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../Custom-Hook/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import '../../Styles/UpdateUser.css'
const UpdateUser = () => {
  const { userDetails } = useUserContext();
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

   const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: userDetails.username,
    mobile: userDetails.mobile,
    email: userDetails.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `/api/UpdateUser/${userDetails._id}`,
        formData,{headers: {
            'Content-Type': 'application/json',
            'Authorization':token
      }

    }
      );
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(()=>{
       navigate('/')
      },1000)
      
    } catch (error) {
      setLoading(false);
      toast.error("Error in Updating", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setFormData({
      username: userDetails.username,
      mobile: userDetails.mobile,
      email: userDetails.email,
    });
  }, [userDetails]);
  return (
    <div className="update-component">
      <h4>Update-User</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="phone"
            className="form-control"
            placeholder="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn-div">
          <button type="submit" className="btn-submit">
          Update User
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
