import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '../../Styles/Home.css'
import NavBar from '../NavBar';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';const Home = () => {
const navigate=useNavigate()
  const [userDetails, setUserDetails] = useState([]);
  const [loading,setLoading]=useState()
  const token = localStorage.getItem('token');
  const [filter, setFilter] = useState('name');
  const [sort, setSort] = useState('az'); // Added state for sorting

  const getdata = async () => {

    const res = await axios.get('/api/users',{headers: {
        'Content-Type': 'application/json',
        'authorization':token
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
  
  useEffect(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      setFilter(savedFilter);
    }
  }, []);
  const userCards = document.querySelectorAll(".user-card",".parent");
  
  userCards.forEach((card) => {
    const randomColor = getRandomColor();
    card.style.backgroundColor = randomColor;
  });
  const handleLogout=()=>{
    setTimeout(()=>{
        localStorage.removeItem('token');
        toast.success("Logout successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
    },1000)
    navigate('/login')

  }
  const handleSearch = (searchQuery, filter) => {
    const searchWords = searchQuery.toLowerCase().split(' '); // Split the search query into words
    const filteredUsers = userDetails.filter((user) => {
      const value = user[filter]
      if (value) {
        const lowercaseValue = value.toLowerCase();
        return searchWords.every((word) => lowercaseValue.includes(word));
      }
      return false
    });
  

    setUserDetails(filteredUsers);
  };
 
  useEffect(() => {
    getdata();
  }, []);
  const handleSort = (sortOption) => {
    setSort(sortOption);
    const sortedUsers = [...userDetails];
    console.log(sortedUsers)
    if (sortOption === 'az') {
      sortedUsers.sort((a, b) => (a.username || '').localeCompare(b.username || ''));
    } else if (sortOption === 'za') {
      sortedUsers.sort((a, b) => (b.username || '').localeCompare(a.username || ''));
    }
    setUserDetails(sortedUsers);
  };
  

  return (
    <div className='background'>
         <NavBar onLogout={handleLogout} onSearch={handleSearch} />
         <div className="filter-options">
          <button onClick={() => handleSort('az')}>A-Z</button>
          <button onClick={() => handleSort('za')}>Z-A</button>
         
        </div>
        <div className="user-cards">
      {userDetails.map((user) => (
        <div key={user._id}>
        <Link className='link-card' to={`/user/${user._id}`} key={user._id}>
        <div className="user-card" key={user._id}>
          <h3>{user.name}</h3>
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.username}</p>
          <p>Mobile: {user.mobile}</p>
        </div>
        </Link>

      </div>
      ))}
    </div>
    <ToastContainer/>

    </div>
  );
};

export default Home;
