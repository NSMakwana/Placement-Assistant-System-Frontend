import React, { useEffect, useState } from "react";
import {CompanyService} from "../../Services/CompanyServices";
import CompanyTable from "../../Components/student/CompanyTable";
import CompanyDetails from "../../Components/student/CompanyDetails";
import "./CompanyDashboard.css";
import StudentServices from "../../Services/StudentServices";
import axios from "axios";
const CompanyDashboard = ({}) => {

       
       const [Option, setOption] = useState("Viewcompany");
      const [batch, setBatch] = useState(null); // Track the selected batch
      const [selectedCompany, setSelectedCompany] = useState(null); // Track the selected student
      const [companies, setCompany] = useState([]);

      const storedUser = localStorage.getItem('user'); 
      const email = storedUser ? JSON.parse(storedUser).email : "";

     
      useEffect(() => {
    // Fetch all companies where visible === true
    CompanyService.getVisibleCompanies()
      .then((response) => {
        setCompany(response.data);
      })
      .catch((error) =>
        console.error("Error fetching visible companies:", error)
      );
  }, []);
     

  
    const renderResultContent = () => {
       
        if (selectedCompany) {
          return (
            <div className="viewcompany">
              <button
                className="back-btn"
                onClick={() => setSelectedCompany(null)} // Go back to table
              >
                <img src="/Images/Back.png" height="25px" width="25px" />
              </button>
              <CompanyDetails company={selectedCompany} />
            </div>
          );
        } else {
            return (
            <div className="viewcompany">
                 
                 <CompanyTable       
                  companies={companies}   
                   onView={handleViewCompany}   
                  
            />
            </div>            
            );           
        }      
        
    };
    const handleViewCompany = (company) => {
      setSelectedCompany(company); // Set the selected student
    };
    
  
    const handleOptionClick = (option) => {
      setOption(option); // Set the currently selected option
  }; 
    const renderContent = () => {
       
        return (
            <>                
            <div className="cmp-buttons">
            <div className="breadcrumb">
            Dashboard &gt; Company
            </div>
            
            <br />
            <button onClick={() => handleOptionClick("viewcompany")}>
            <img src="../Images/Side errow.png" height="15px" width="15px" /> View Company Details
            </button>
            </div>

            {/* Render student-specific content */}
            <div className="main-section">{renderResultContent()}</div>
            </>
        );
        }
       
    
    return <div className="CompanyDashboard">{renderContent()}</div>;
};
export default CompanyDashboard;