import BrandBarChart from './DashboardPages/BrandBarChart';
import './Dashboard.css';
import SalesLineChart from './DashboardPages/SalesLineChart';
import StockPieChart from './DashboardPages/StockPieChart';
import SellerBarChart from './DashboardPages/SellerBarChart';
import { useState } from 'react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('stock');
    const [activeTab2, setActiveTab2] = useState('status');
    const [activeTab3, setActiveTab3] = useState('months');

    return (
        <div className="container-fluid">
            <div className="row first-row">          
                <nav className="nav nav-pills flex-column flex-sm-row bg-white p-2 rounded shadow-sm mb-4">
                    <button onClick={() => setActiveTab('stock')} className={`nav-button nav-link border-0 ${activeTab === 'stock' ? 'active' : ''}`}>
                    📦 Veicoli Stock
                    </button>
                    <button onClick={()=> setActiveTab('sales')} className={`nav-button flex-sm-fill text-sm-center nav-link border-0 ${activeTab === 'sales' ? 'active' : ''}`}>
                        📈 Analisi Vendite
                    </button>
                </nav>
            </div>                 
            <div className="tab-content">
                {activeTab === 'stock' && 
                    <div className="row second-row">
                        {activeTab2 === 'status' && <div className="col-10"><StockPieChart /></div>}
                        {activeTab2 === 'brands' && <div className="col-10"><BrandBarChart /></div>}
                        <div className="col-2">
                            <div className='right-sidebar bg-light rounded shadow'>
                                <ul className="sidebar-card nav nav-pills">
                                    <li className="nav-item">
                                        <button onClick={()=> setActiveTab2('status')} className={`switch-button nav-link mb-4 ${activeTab2 === 'status' ? 'active' : ''}`}>
                                            <span className="emoji">📊</span> 
                                            <span className="button-text">Stato Macchine</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={()=> setActiveTab2('brands')} className={`switch-button nav-link ${activeTab2 === 'brands' ? 'active' : ''}`}>
                                            <span className="emoji">🚗</span>
                                            <span className="button-text">Top Brands</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
                {activeTab === 'sales' && 
                    <div className="row second-row">
                        {activeTab3 === 'months' && <div className="col-10 "><SalesLineChart /></div>}
                        {activeTab3 === 'seller' && <div className="col-10"><SellerBarChart /></div>}
                        <div className="col-2">
                            <div className='right-sidebar bg-light rounded shadow'>
                                <ul className="sidebar-card nav nav-pills">
                                    <li className="nav-item">
                                    <button onClick={()=> setActiveTab3('months')} className={`switch-button nav-link mb-4 ${activeTab3 === 'months' ? 'active' : ''}`}>
                                        <span className="emoji">📊</span>
                                        <span className="button-text">Vendite</span>
                                    </button>
                                    </li>
                                    <li>
                                    <button onClick={()=> setActiveTab3('seller')} className={`switch-button nav-link ${activeTab3 === 'seller' ? 'active' : ''}`}>
                                        <span className="emoji">🚗</span>
                                        <span className="button-text">Top Seller</span>
                                    </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div> 
        </div>
        
    );
};

export default Dashboard;