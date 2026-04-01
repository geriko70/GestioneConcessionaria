import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard'; 
import Inventory from './components/Inventory';
import { useState,useEffect } from 'react';
import axios from "axios";
import LoginForm from './LoginForm';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token_accesso'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [veicoli,setVeicoli]=useState([]);
  const [vendite,setVendite]=useState([]);
  const loginEffettuato = (nuovoToken) => {
    localStorage.setItem('token_accesso', nuovoToken); // Salviamo nel browser
    setToken(nuovoToken); // Aggiorniamo lo stato per sbloccare l'interfaccia
  };
  const logout = () => {
    localStorage.removeItem('token_accesso'); // Puliamo il browser
    setToken(null); // Torniamo al Login
  };
  useEffect(() => {
    const config = {
    headers: {
      Authorization: `Bearer ${token}` // 'Bearer' è lo standard obbligatorio per JWT
    }
  };
    if(token){
      axios.get('https://gestioneconcessionaria.onrender.com/api/veicoli/',config)
              .then(response => {
                  setVeicoli(response.data);
              })
              .catch(error => {
                  console.error("Errore API:", error);
              });
      axios.get('https://gestioneconcessionaria.onrender.com/api/vendite/',config)
              .then(response => {
                  setVendite(response.data);
              })
              .catch(error => {
                  console.error("Errore API:", error);
              });
        }}, [token]);
  
  if (!token) {
    return (
      <div className="d-flex vw-100 vh-100">
        <LoginForm loginEffettuato={loginEffettuato}/>
      </div>
    );
  }else{
    return (
      <div className="d-flex vw-100 vh-100">
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} logout={logout}/>
        <main className="flex-grow-1 bg-light overflow-auto">
          {activeTab === 'dashboard' && <Dashboard veicoli={veicoli} vendite={vendite} />}
          {activeTab === 'inventory' && <Inventory veicoli={veicoli} vendite={vendite} setVeicoli={setVeicoli}  setVendite={setVendite}/>}
        </main>
      </div>
    );
  }
}

export default App;