import React from 'react';
import './Sidebar.css';
const Sidebar = ({setActiveTab, activeTab}) => {
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
        <li>
          <a href="#" className="nav-link text-white mb-2">
             👥 Clienti
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white mb-2">
             ⚙️ Impostazioni
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <span className="d-flex align-items-center text-white text-decoration-none">
          <strong>Admin Login</strong>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;