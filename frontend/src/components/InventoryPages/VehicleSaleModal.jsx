import { useState } from "react";
import axios from "axios";
const VehicleSaleModal = ({ selectedVehicle, setIsSaleModalOpen, setSelectedVehicle , setVendite ,setVeicoli,token,logout}) => {
    const [prezzo_vendita_effettivoNuovo,setPrezzo_vendita_effettivoNuovo]=useState(selectedVehicle.prezzo_listino);
    const handlePrezzoVenditaEffettivoChange=(e)=>{
        setPrezzo_vendita_effettivoNuovo(e.target.value);
    }
    const handleSubmit= async ()=>{
        let veicoloAggiornato={
            ...selectedVehicle,
            stato: "venduto",
        };
        const oggi = new Date().toISOString().split('T')[0];
    const venditaNuova={
            veicolo_id:selectedVehicle.id,
            data_vendita:oggi,
            prezzo_vendita_effettivo:prezzo_vendita_effettivoNuovo,
            venditore:"Orly"
        }
        const veicoloDaAggiornare = { stato: "venduto" };
        try {
            const config = {
            headers: {
            'Authorization': `Bearer ${token}`, // 'token' arriva dalle props (Drilling)
            'Content-Type': 'application/json'  // Specifichiamo che mandiamo dati JSON
            }
            }
            let response= await axios.patch(
                `https://gestioneconcessionaria.onrender.com/api/veicoli/${selectedVehicle.id}/`,veicoloDaAggiornare,config);
                if (response.status === 200) {
                veicoloAggiornato=response.data;
                setVeicoli(prev=>prev.map(v=>v.id==selectedVehicle.id ? veicoloAggiornato : v));             // Chiudiamo il modal
                }
            response = await axios.post(
                `https://gestioneconcessionaria.onrender.com/api/vendite/`,venditaNuova,config);
                const venditaCreata = response.data;
                // 4. Aggiungiamo il nuovo veicolo alla lista esistente (senza sovrascrivere)
                setVendite(prev => [...prev, venditaCreata]);
                alert("Nuova vendita aggiunta con successo!");
                close(); // Chiudiamo il modal di aggiunta
        }catch (error) {
            if (error.response?.status === 401) {
                alert("Sessione scaduta, effettua di nuovo il login.");
                logout(); // Forza il ritorno al login
            } else {
                alert("Errore di connessione al server.");
            }

        }
}
    const close = () => {
        setIsSaleModalOpen(false);
        setSelectedVehicle(null);
    };
    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    
                    <div className={`modal-header text-dark bg-success`}>
                        <h5 className="modal-title fw-bold">
                            Vendita
                        </h5>
                        <span className="modal-title fw-bold">{selectedVehicle.targa}</span>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>
                    

                    <div className="modal-body p-4">
                          
                        <div className="row text-center g-3">
                            <h6 className="fw-bold text-uppercase text-secondary">Prezzo di Listino: {(Number)(selectedVehicle.prezzo_listino)}€</h6>
                            <div className="col">
                                <p className="text-muted">Prezzo di vendita</p>
                                <input value={prezzo_vendita_effettivoNuovo}onChange={handlePrezzoVenditaEffettivoChange} className="form-control form-control-sm"type="text"></input>
                            </div>
                        </div>
                        
                    </div>

                    <div className="modal-footer bg-light border-0">
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-success px-4">
                              Vendi il veicolo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleSaleModal;