import { Component } from "react";
import {AiOutlineSearch} from 'react-icons/ai'
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div className="app-container">
        <img
          src="https://res.cloudinary.com/dgkw0cxnh/image/upload/v1689784525/riseupp_cb8omi.webp"
          alt="logo"
          className="logo"
        />
        <div className="input-container">
          <input placeholder="Search Image" type="search" />
          <AiOutlineSearch className='icon'/>
        </div>
      </div>
    );
  }
}
export default Home;
