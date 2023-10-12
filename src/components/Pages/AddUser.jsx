import React, { useState } from 'react';
import axios from 'axios'; // Make sure to import axios or your HTTP client library

const AddUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    mobile: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/addUser', userData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <h4>Add-User</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            name="mobile"  // Corrected the name attribute
            value={userData.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="btn-div">
          <button type="submit" className="btn-submit">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
