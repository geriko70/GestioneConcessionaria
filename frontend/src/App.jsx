import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; 
import Inventory from './components/Inventory';
import { useState } from 'react';
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  return (
    <div className="d-flex vw-100 vh-100">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
      <main className="flex-grow-1 bg-light overflow-auto">
        {activeTab === 'dashboard' && <Dashboard/>}
        {activeTab === 'inventory' && <Inventory/>}
      </main>
    </div>
  );
}

export default App;