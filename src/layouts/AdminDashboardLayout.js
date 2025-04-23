import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/admin/Sidebar';
import Header from '../Components/admin/Header';

const AdminDashboardLayout = () => {
  const [selectedMenu, setSelectedMenu] = useState('');

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      {/* Main Content Wrapper */}
      <div className="main-content" style={{ marginLeft: '-30px' }}>
        <Header />

        {/* Push content below the fixed header */}
        <div
          className="content"
          style={{ paddingTop: '60px', padding: '20px' }}
        >
          <Outlet context={{ selectedMenu, setSelectedMenu }} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
