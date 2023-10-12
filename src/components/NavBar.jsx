import React,{useState} from 'react'
import '../Styles/NavBar.css'
import { AiOutlineSearch } from 'react-icons/ai';

const NavBar = ({ onLogout, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('name');

  const handleSearch = () => {
    onSearch(searchQuery, filter);
  };

  return (
    <nav className="navbar">
       <div className="navbar-right">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          
        />
        <button onClick={handleSearch}>
  <AiOutlineSearch style={{fontSize:"15px" }} /> 
</button>  
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="name">Name</option>
          <option value="mobile">Mobile</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div className="navbar-left">
        <button onClick={onLogout}>Logout</button>
      </div>
     
    </nav>
    );
  };
export default NavBar
