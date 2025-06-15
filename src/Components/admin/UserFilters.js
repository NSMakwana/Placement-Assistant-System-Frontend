import React, { useState } from "react";
import "./UserFilters.css";


const Filters = ({ onFilter, downloadCSV, downloadPDF }) => {
 const [search, setSearch] = useState("");
  const handleFilterChange = (filterType, value) => {
     if (filterType === "search") setSearch(value);
     onFilter(filterType, value); // Notify parent about the filter change
  };

  // Function to clear all filters
  const handleClearFilters = () => {
    const clearedFilters = {    
      search: ""    
    };
    setSearch("");
    

    // Pass cleared filters as a single object
    onFilter("clear", clearedFilters);
  };
  
  return (
    <div className="filters">
      

      <div>
        <img src="../Images/Search.png" height="22px" width="25px" alt="search" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          style={{ marginTop: "15px", marginLeft: "0px"}} 
          />
      </div>
      <div>
        <button className="download-btn" onClick={downloadCSV}>
          <img src="../Images/download.png" height="22px" width="25px" alt="download" />
          Download(.CSV)
        </button>
      </div>
      <div>
        <button className="download-btn" onClick={downloadPDF}>
          <img src="../Images/download.png" height="22px" width="25px" alt="search" />
          Download(.pdf)
        </button>
      </div>
    

      {/* Clear Filters Button */}
      <div className="clear-filter">
        <button className="clear-btn">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
