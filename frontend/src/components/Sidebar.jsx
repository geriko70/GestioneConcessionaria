import React from 'react';
import './Sidebar.css';
const Sidebar = ({setActiveTab, activeTab,logout}) => {
  const usernameLoggato = localStorage.getItem('username_loggato');
  return (
    <div className="d-flex flex-column p-3 text-white bg-dark" style={{ width: '30vh', height: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">AutoManager</span>
      </a>
      <hr/>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button onClick={() => setActiveTab('dashboard')} className={`sidebar-button flex-sm-fill nav-link mb-2 text-white ${activeTab === 'dashboard' ? 'active' : ''}`}>
          📊 Dashboards
          </button>
        </li>
        <li>
          <button onClick={() => setActiveTab('inventory')} className={`sidebar-button flex-sm-fill nav-link mb-2 text-white ${activeTab === 'inventory' ? 'active' : ''}`}>
          🚗 Inventario
          </button>
        </li>
      </ul>
      <h2 className=' fw-bold text-center text-success'>{usernameLoggato}</h2>
      <hr/>
        <button onClick={logout} className='btn btn-danger'>Log Out</button>
    </div>
  );
};

export default Sidebar;