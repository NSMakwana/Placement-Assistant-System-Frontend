  import React from "react";
  import { NavLink } from "react-router-dom";
  import "./Sidebar.css";

  function Sidebar() {
    return (
      <div className="sidebar">
        <NavLink
          to="adminprofile"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Admin Profile Icon" className="menu-icon" />
          <span className="menu-text">Admin-Profile</span>
        </NavLink>
          
        <NavLink
          to="user_dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Student Icon" className="menu-icon" />
          <span className="menu-text">User</span>
        </NavLink>

        <NavLink
          to="manage_admin"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img
            src="../Images/Threeline.png"
            alt="Manage Admin Icon"
            className="menu-icon"
          />
          <span className="menu-text">Manage Admin</span>
        </NavLink>

        <NavLink
          to="admin_dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Student Icon" className="menu-icon" />
          <span className="menu-text">Student</span>
        </NavLink>

        <NavLink
          to="companydetails"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Company Icon" className="menu-icon" />
          <span className="menu-text">Company</span>
        </NavLink>
        <NavLink
          to="pollgenerator"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Company Icon" className="menu-icon" />
          <span className="menu-text">Poll Generator</span>
        </NavLink>
        <NavLink
          to="polllist"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Company Icon" className="menu-icon" />
          <span className="menu-text">Manage Polls</span>
        </NavLink>
        <NavLink
          to="preplacement_talk"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img
            src="../Images/Threeline.png"
            alt="Preplacement_talk Icon"
            className="menu-icon"
          />
          <span className="menu-text">Preplacement Talk</span>
        </NavLink>

        <NavLink
          to="expense"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img
            src="../Images/Threeline.png"
            alt="Preplacement_talk Icon"
            className="menu-icon"
          />
          <span className="menu-text">Manage Expense</span>
        </NavLink>

        <NavLink
          to="result"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Result Icon" className="menu-icon" />
          <span className="menu-text">Result</span>
        </NavLink>
        <NavLink
          to="/admin/analysis/fullscreen"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Analysis Icon" className="menu-icon" />
          <span className="menu-text">Analysis</span>
        </NavLink>
        <NavLink
          to="chat"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          {/* <img src="../Images/Threeline.png" className="menu-icon" /> */}
          <span className="menu-text">💬 Chat</span>
        </NavLink>
        <NavLink
          to="analysis"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <img src="../Images/Threeline.png" alt="Analysis Icon" className="menu-icon" />
          <span className="menu-text">Reports</span>
        </NavLink>
      </div>
    );
  }

  export default Sidebar;
