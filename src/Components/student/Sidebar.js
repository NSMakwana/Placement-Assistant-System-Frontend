import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const email = storedUser ? JSON.parse(storedUser).email : "";
        const response = await fetch(
          `https://placement-assistant-system.onrender.com/api/user/hasSubmitted?email=${email}`
        );

        if (response.ok) {
          const data = await response.json();
          setHasSubmitted(data);
        } else {
          setHasSubmitted(false);
        }
      } catch (error) {
        console.error("Error checking submission status:", error);
        setHasSubmitted(false);
      }
    };

    checkSubmissionStatus();
  }, []);

  const handleNavClick = (e) => {
    if (!hasSubmitted) {
      e.preventDefault();
      alert("Please submit the agreement form before accessing other sections.");
    }
  };

  return (
    <div className="sidebar">
      
      {/* ⭐ NEW — Student Profile FIRST */}
      <NavLink
        to="studentprofile"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">Student Profile</span>
      </NavLink>

      {/* Agreement Form */}
      <NavLink
        to="agreement"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">Agreement Form</span>
      </NavLink>

      {/* Disabled Until Agreement Submitted */}
      <NavLink
        to="studentdetail"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item disabled"
        }
        onClick={(e) => !hasSubmitted && handleNavClick(e)}
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">Student Detail Form</span>
      </NavLink>

      <NavLink
        to="company"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item disabled"
        }
        onClick={(e) => !hasSubmitted && handleNavClick(e)}
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">View Companies</span>
      </NavLink>

      <NavLink
        to="analysis"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item disabled"
        }
        onClick={(e) => !hasSubmitted && handleNavClick(e)}
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">Analysis</span>
      </NavLink>

      <NavLink
        to="cvbuilder"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <img src="../Images/Threeline.png" className="menu-icon" />
        <span className="menu-text">CV Builder</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;
