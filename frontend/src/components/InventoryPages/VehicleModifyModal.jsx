import {useState} from 'react';
import axios from "axios";const VehicleModifyModal = ({ selectedVehicle, setIsModifyModalOpen, setSelectedVehicle , setVeicoli}) => {
    const [cambioModifica,setCambioModifica]=useState(selectedVehicle.cambio);
    const [chilometriModifica,setChilometriModifica]=useState(selectedVehicle.km);
    const [prezzoListinoModifica,setPrezzoListinoModifica]=useState(selectedVehicle.prezzo_listino);
    const [statoModifica,setStatoModifica]=useState(selectedVehicle.stato);
    const [classe_ambientaleModifica,setClasse_ambientaleModifica]=useState(selectedVehicle.classe_ambientale);
    const [alimentazioneModifica,setAlimentazioneModifica]=useState(selectedVehicle.alimentazione);
    const [n_proprietariModifica,setN_proprietariModifica]=useState(selectedVehicle.n_proprietari);
    const [targaModifica,setTargaModifica]=useState(selectedVehicle.targa);
    

    
    if (!selectedVehicle) return null;

    const handleStatoChange=(e)=>{
        const statoModifica=e.target.value;
        setStatoModifica(statoModifica);
    }
    const handleAlimentazioneChange=(e)=>{
        const alimentazioneModifica=e.target.value;
        setAlimentazioneModifica(alimentazioneModifica);
    }
    const handleCambioChange=(e)=>{
        const cambioModifica=e.target.value;
        setCambioModifica(cambioModifica);
    }
    const handleClasse_AmbientaleChange=(e)=>{
        const classe_ambientaleModifica=e.target.value;
        setClasse_ambientaleModifica(classe_ambientaleModifica);
    }
    
    const handleN_proprietariChange=(e)=>{
        const n_proprietariModifica=e.target.value;
        setN_proprietariModifica(n_proprietariModifica);
    }
    const handleChilometriChange=(e)=>{
        const chilometriModifica=e.target.value;
        setChilometriModifica(chilometriModifica);
    }
    const handleTargaChange=(e)=>{
        const targaModifica=e.target.value;
        setTargaModifica(targaModifica);
    }
    const handlePrezzoListinoChange=(e)=>{
        const prezzoListinoModifica=e.target.value;
        setPrezzoListinoModifica(prezzoListinoModifica);
    }
    const handleSubmit=async ()=>{
        let veicoloAggiornato={
            ...selectedVehicle,
            km: parseInt(chilometriModifica),
            prezzo_listino:parseFloat(prezzoListinoModifica),
            stato: statoModifica,
            alimentazione:alimentazioneModifica,
            cambio: cambioModifica,
            classe_ambientale:classe_ambientaleModifica,
            n_proprietari: parseInt(n_proprietariModifica),
            targa:targaModifica,
        };
        try{
            const response= await axios.put(`https://gestioneconcessionaria.onrender.com/api/veicoli/${selectedVehicle.id}/`,veicoloAggiornato);
            if (response.status === 200) {
            veicoloAggiornato=response.data;
            setVeicoli(prev=>prev.map(v=>v.id==selectedVehicle.id ? veicoloAggiornato : v));
            alert("Veicolo aggiornato con successo!");            
            close(); // Chiudiamo il modal
        }
    } catch (error) {
    console.error(error, error.response?.data);
    if (error.response?.data) {
        const messaggi = Object.entries(error.response.data)
            .map(([campo, errore]) => `${campo}: ${errore}`)
            .join("\n");
        alert("Errore di validazione:\n" + messaggi);
    } else {
        alert("Errore di connessione al server.");
    }
}
    }
    const close = () => {
        setIsModifyModalOpen(false);
        setSelectedVehicle(null);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    
                    <div className={`modal-header text-warning bg-dark`}>
                        <h5 className="modal-title fw-bold ">
                            Modifica veicolo
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>
                    

                    <div className="modal-body p-4">
                        <div className="row text-center mb-4">
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">CHILOMETRAGGIO </p>
                                <span className="fw-semibold">{Number(selectedVehicle.km).toLocaleString()} km </span>
                                <input onChange={handleChilometriChange} className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">PREZZO DI LISTINO </p>
                                <span className="fw-semibold">{Number(selectedVehicle.prezzo_listino).toLocaleString()} €</span>
                                <input onChange={handlePrezzoListinoChange}className="form-control form-control-sm"type="text" ></input>
                            </div> 
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">STATO STOCK</p>
                                <span className={`fw-semibold`}>
                                    {selectedVehicle.stato.toUpperCase()}
                                </span>
                                <select value={statoModifica} onChange={handleStatoChange} className="form-select form-select-sm">
                                    <option value="transito">
                                        Transito
                                    </option>
                                    <option value="officina">
                                        Officina
                                    </option>
                                    <option value="disponibile">
                                        Disponibile
                                    </option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <p className="text-muted mb-1">ALIMENTAZIONE</p>
                                <span className={`fw-semibold`}>
                                    {selectedVehicle.alimentazione.toUpperCase()}
                                </span>
                                <select value={alimentazioneModifica} onChange={handleAlimentazioneChange} className="form-select form-select-sm">
                                    <option value="benzina">
                                        Benzina
                                    </option>
                                    <option value="officina">
                                        Diesel
                                    </option>
                                    <option value="metano">
                                        Metano
                                    </option>
                                    <option value="gpl">
                                        GPL
                                    </option>
                                    <option value="ibrida">
                                        Ibrida
                                    </option>
                                    <option value="elettrica">
                                        Elettrica
                                    </option>
                                </select>
                            </div>
                        </div>

                        <hr />

                        {/* Riga 2: Specifiche Tecniche in Griglia */}
                        <div className="row text-center g-3">
                            <h6 className="fw-bold text-uppercase small text-secondary">Caratteristiche Tecniche</h6>
                            
                            <div className="col-3 border-end">
                                <p className="text-muted mb-1">TARGA </p>
                                    <span className="fw-semibold">{(selectedVehicle.targa).toLocaleString()} </span>
                                <input onChange={handleTargaChange} className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">CAMBIO</p>
                                <span className={`fw-semibold`}>
                                    {selectedVehicle.cambio.toUpperCase()}
                                </span>
                                <select value={cambioModifica} onChange={handleCambioChange}className="form-select form-select-sm">
                                    <option value="manuale">
                                        Manuale
                                    </option>
                                    <option value="automatico">
                                        Automatico
                                    </option>
                                </select>
                            </div>
                           <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">CLASSE AMBIENTALE</p>
                                <span className={`fw-semibold`}>
                                    {selectedVehicle.classe_ambientale.toUpperCase()}
                                </span>
                                <select disabled={alimentazioneModifica=="elettrica"} value={alimentazioneModifica=="elettrica" ?"elettrico":classe_ambientaleModifica} title={alimentazioneModifica=="elettrica" ?"Se è alimentata elettrica può essere solo di classe elettrica" : ""} onChange={handleClasse_AmbientaleChange}className="form-select form-select-sm">
                                    <option value="euro4">
                                        Euro 4
                                    </option>
                                    <option value="euro5">
                                        Euro 5
                                    </option>
                                    <option value="euro6" >
                                        Euro 6
                                    </option>
                                    <option value="elettrico">
                                        Zero
                                    </option>
                                </select>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted mb-1">N° Proprietari</p>
                                <span className="fw-semibold">{selectedVehicle.n_proprietari}</span>
                                <input onChange={handleN_proprietariChange} value={n_proprietariModifica}type="number" min="1" className='form-control-sm form-control'></input>
                            </div>
                            
                        </div>


                        
                    </div>

                    <div className="modal-footer bg-light border-0">
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-warning px-4">
                             Effettua la modifica
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleModifyModal;