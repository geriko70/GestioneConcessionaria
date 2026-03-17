import React from 'react';
import { useState } from 'react';
import StockTable from './InventoryPages/StockTable';
import SalesTable from './InventoryPages/SalesTable';
import './Inventory.css';
const Inventory = ({veicoli,vendite}) => {
    const [activeTab, setActiveTab] = useState('stock');
    return (
        <div className='container-fluid'>
            <div className='row'>
                <nav className="nav nav-pills flex-column flex-sm-row bg-white p-2 rounded shadow-sm mb-4">
                    <button onClick={() => setActiveTab('stock')} className={`nav-button text-sm-center nav-link border-0 ${activeTab === 'stock' ? 'active' : ''}`}>
                        📋 Analisi Stock
                    </button>
                    <button onClick={()=> setActiveTab('sales')} className={`nav-button text-sm-center nav-link border-0 ${activeTab === 'sales' ? 'active' : ''}`}>
                        💰 Storico Vendite
                    </button>
                </nav>
            </div>
            <div className='row'>
                {activeTab === 'stock' && <div className='col-12'><StockTable veicoli={veicoli} vendite={vendite}/></div>}
                {activeTab === 'sales' && <div className='col-12'><SalesTable veicoli={veicoli} vendite={vendite}/></div>}
            </div>
                
            
        </div>
    );
};

export default Inventory;