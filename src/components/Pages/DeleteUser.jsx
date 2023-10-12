import React, { useEffect } from 'react'
import { useUserContext } from '../../Custom-Hook/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from 'react-icons/fa'; // Import Font Awesome icons

const DeleteUser = () => {
  const { userDetails } = useUserContext();
const id=userDetails._id
const navigate=useNavigate()
const token = localStorage.getItem('token');

  const handleDelete=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.delete(`/api/deleteUser/${id}`,{headers: {
        'Content-Type': 'application/json',
        'Authorization':token
  }
})
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      }); 
      setTimeout(()=>{
        navigate('/')
      },1000) 
      } catch (error) {
        toast.success("Something Went Wrong", {
          position: toast.POSITION.TOP_RIGHT,
        });      }
  }
  useEffect(()=>{
    handleDelete()
  })
  return (
   <div>
    <FaTrash style={{ color: 'white',fontSize:"20px" }} onClick={handleDelete}/>
    <ToastContainer />
   </div>

  )
}

export default DeleteUser
