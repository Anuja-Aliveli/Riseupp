import { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./index.css";

const tabs = [
  { name: "Mountain", id: 1 },
  { name: "Flowers", id: 2 },
  { name: "Beaches", id: 3 },
  { name: "Cities", id: 4 },
];

class Home extends Component {
  state = { activeId: 1 };

  onActive = (id) => {
    this.setState({ activeId: id });
  };

  render() {
    const { activeId } = this.state;
    return (
      <div className="app-container">
        <img
          src="https://res.cloudinary.com/dgkw0cxnh/image/upload/v1689784525/riseupp_cb8omi.webp"
          alt="logo"
          className="logo"
        />
        <div className="input-container">
          <input placeholder="Search Image" type="search" />
          <AiOutlineSearch className="icon" />
        </div>
        <div className="tab-container">
          {tabs.map((eachTab) => (
            <button
              className={activeId === eachTab.id ? "active tab" : "tab"}
              type="button"
              id={eachTab.id}
              onClick={() => this.onActive(eachTab.id)}
            >
              {eachTab.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default Home;
