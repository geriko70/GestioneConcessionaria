import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; 
import Inventory from './components/Inventory';
import { useState,useEffect } from 'react';
import axios from "axios";
function App() {

  const [activeTab, setActiveTab] = useState('dashboard');
  const [veicoli,setVeicoli]=useState([]);
  const [vendite,setVendite]=useState([]);

  useEffect(() => {
  axios.get('https://gestioneconcessionaria.onrender.com/api/veicoli/')
          .then(response => {
              setVeicoli(response.data);
          })
          .catch(error => {
              console.error("Errore API:", error);
          });
  axios.get('https://gestioneconcessionaria.onrender.com/api/vendite/')
          .then(response => {
              setVendite(response.data);
          })
          .catch(error => {
              console.error("Errore API:", error);
          });
  }, []);
  return (
    <div className="d-flex vw-100 vh-100">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab}/>
      <main className="flex-grow-1 bg-light overflow-auto">
        {activeTab === 'dashboard' && <Dashboard veicoli={veicoli} vendite={vendite}/>}
        {activeTab === 'inventory' && <Inventory veicoli={veicoli} vendite={vendite}/>}
      </main>
    </div>
  );
}

export default App;