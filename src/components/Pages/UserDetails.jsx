import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Styles/UserDetails.css';
import DeleteUser from './DeleteUser';
import { useUserContext } from '../../Custom-Hook/UserContext'; // Import the context hook
import { FaEdit } from 'react-icons/fa'; // Import Font Awesome icons

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { userDetails, setUserDetails } = useUserContext(); // Use the context hook inside the component
  const token = localStorage.getItem('token');

  const getCurrentUser = async () => {
    const res = await axios.get(`/api/users/${userId}`,{headers: {
        'Content-Type': 'application/json',
        'Authorization':token
    }
  });
    setUserDetails(res.data.data);
  };
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  const userCards = document.querySelectorAll(".user-details-container");
  
  userCards.forEach((card) => {
    const randomColor = getRandomColor();
    card.style.backgroundColor = randomColor;
  });
  const handleUpdate = () => {
    navigate(`/update-user/${userDetails._id}`);
  };

  useEffect(() => {
    getCurrentUser();
    <DeleteUser/>
  }, []);

  if (!userDetails._id) {
    return <div className="user-not-found">User not found</div>;
  }

  return (
    <div className="parent">
      <div className="user-details-container">
        <h3 className="user-details-title">User Details</h3>
        <div className="user-details-item">
          <span className="user-details-label">ID:</span>
          <span className="user-details-value">{userDetails._id}</span>
        </div>
        <div className="user-details-item">
          <span className="user-details-label">Name:</span>
          <span className="user-details-value">{userDetails.username}</span>
        </div>
        <div className="user-details-item">
          <span className="user-details-label">Email:</span>
          <span className="user-details-value">{userDetails.email}</span>
        </div>
        <div className="user-details-item">
          <span className="user-details-label">Mobile:</span>
          <span className="user-details-value">{userDetails.mobile}</span>
        </div>
        <div className="user-card-actions">
             <FaEdit  style={{ color: 'white', fontSize:"25px"}} onClick={handleUpdate} />
          <DeleteUser />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
