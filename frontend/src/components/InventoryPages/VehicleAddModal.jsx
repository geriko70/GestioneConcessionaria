import {useState} from 'react';
import axios from "axios";const VehicleAddModal = ({setIsAddModalOpen , setVeicoli,token,logout}) => {
const [marcaNuovo, setMarca] = useState("");
const [modelloNuovo, setModello] = useState("");
const [annoNuovo, setAnno] = useState("");
const [targaNuovo, setTarga] = useState("");
const [kmNuovo, setKm] = useState("");
const [alimentazioneNuovo, setAlimentazione] = useState("");
const [cambioNuovo, setCambio] = useState("");
const [classe_ambientaleNuovo, setClasse_ambientale] = useState("");
const [prezzo_acquistoNuovo, setPrezzo_acquisto] = useState("");
const [prezzo_listinoNuovo, setPrezzo_listino] = useState("");
const [statoNuovo, setStato] = useState("");
const [n_proprietariNuovo, setN_proprietari] = useState("");

    // Gestione Testo con limite caratteri (Esempio Targa)
const handleTargaChange = (e) => {
    const valore = e.target.value.toUpperCase().replace(/\s/g, ""); // Tutto maiuscolo, no spazi
    if (valore.length <= 7) setTarga(valore);
};

const handleMarcaChange = (e) => setMarca(e.target.value);
const handleModelloChange = (e) => setModello(e.target.value);

// Gestione Numeri (Esempio Anno: solo numeri e max 4 cifre)
const handleAnnoChange = (e) => {
    const valore = e.target.value.replace(/\D/g, ""); // Rimuove tutto ciò che non è un numero
   if (valore.length <= 4) setAnno(valore);
};

const handleKmChange = (e) => setKm(e.target.value.replace(/\D/g, ""));

const handlePrezzoAcquistoChange = (e) => setPrezzo_acquisto(e.target.value);
const handlePrezzoListinoChange = (e) => setPrezzo_listino(e.target.value);

const handleNProprietariChange = (e) => {
    const val = parseInt(e.target.value);
    if (val >= 0 || e.target.value === "") setN_proprietari(e.target.value);
};

// Gestione Select
const handleAlimentazioneChange = (e) => {
    setAlimentazione(e.target.value);
    if (e.target.value === "elettrica") {
        setClasse_ambientale("elettrico");
    }
}
const handleCambioChange = (e) => setCambio(e.target.value);
const handleClasseAmbientaleChange = (e) => setClasse_ambientale(e.target.value);
const handleStatoChange = (e) => setStato(e.target.value);

    const handleSubmit = async () => {
    // 1. Costruiamo l'oggetto con i nomi esatti del database
    const veicoloNuovo = {
        marca: marcaNuovo,
        modello: modelloNuovo,
        anno: parseInt(annoNuovo),
        targa: targaNuovo,
        km: parseInt(kmNuovo),
        alimentazione: alimentazioneNuovo,
        cambio: cambioNuovo,
        classe_ambientale: classe_ambientaleNuovo, // Attenzione al nome dello stato!
        prezzo_acquisto: parseFloat(prezzo_acquistoNuovo),
        prezzo_listino: parseFloat(prezzo_listinoNuovo),
        stato: statoNuovo,
        n_proprietari: parseInt(n_proprietariNuovo),
    };
    
    try {
        const config = {
            headers: {
            'Authorization': `Bearer ${token}`, // 'token' arriva dalle props (Drilling)
            'Content-Type': 'application/json'  // Specifichiamo che mandiamo dati JSON
            }
        };
        // 2. POST all'URL della lista (senza ID!)
        const response = await axios.post(
            `https://gestioneconcessionaria.onrender.com/api/veicoli/`, 
            veicoloNuovo,config
        );
        
            const veicoloCreato = response.data;
            setVeicoli(prev => [...prev, veicoloCreato]);
            alert("Nuovo veicolo aggiunto con successo!");
            close(); 
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Sessione scaduta, effettua di nuovo il login.");
            logout(); // Forza il ritorno al login
        } else {
            console.error("Errore durante il salvataggio:", error.response?.data);
            alert("Errore: controlla i campi o la connessione.");
        }
    }
};
    const close = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    
                    <div className={`modal-header text-success bg-dark`}>
                        <h5 className="modal-title fw-bold ">
                            Aggiungi veicolo
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>
                    

                    <div className="modal-body p-4">
                        <div className="row text-center mb-4">
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">MARCA </p>
                                <input required placeholder="Toyota" onChange={handleMarcaChange} className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">MODELLO </p>
                                <input required placeholder="Aygo"  onChange={handleModelloChange}className="form-control form-control-sm"type="text" ></input>
                            </div> 
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">PREZZO DI ACQUISTO  </p>
                                <input required placeholder="12345"  onChange={handlePrezzoAcquistoChange}className="form-control form-control-sm"type="text" ></input>
                            </div> 
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">ANNO</p>
                                <input required placeholder="12345"  onChange={handleAnnoChange}className="form-control form-control-sm"type="text" ></input>
                            </div>
                        </div>

                        <hr />

                        <div className="row text-center mb-4">
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">CHILOMETRAGGIO </p>
                                <input required placeholder="12345 km" onChange={handleKmChange} className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">PREZZO DI LISTINO </p>
                                <input required placeholder="12345 €"  onChange={handlePrezzoListinoChange}className="form-control form-control-sm"type="text" ></input>
                            </div> 
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">STATO STOCK</p>
                                <select required placeholder="12345" value={statoNuovo} onChange={handleStatoChange} className="form-select form-select-sm">
                                    <option value="" disabled hidden>Seleziona uno stato...</option>
                                    <option value="disponibile">
                                        Disponibile
                                    </option>
                                    <option value="transito">
                                        Transito
                                    </option>
                                    <option value="officina">
                                        Officina
                                    </option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <p className="text-muted mb-1">ALIMENTAZIONE</p>
                                <select required value={alimentazioneNuovo} onChange={handleAlimentazioneChange} className="form-select form-select-sm">
                                    <option value="" disabled hidden>Seleziona un tipo ...</option>
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
                        <hr></hr>
                        {/* Riga 2: Specifiche Tecniche in Griglia */}
                        <div className="row text-center g-3">                            
                            <div className="col-3 border-end">
                                <p className="text-muted mb-1">TARGA </p>
                                <input required placeholder="AB123CD" onChange={handleTargaChange} className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">CAMBIO</p>
                                <select value={cambioNuovo} onChange={handleCambioChange}className="form-select form-select-sm">
                                    <option value="" disabled hidden>Seleziona un tipo...</option>
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
                                <select disabled={alimentazioneNuovo=="elettrica"} value={alimentazioneNuovo=="elettrica" ?"elettrico":classe_ambientaleNuovo} title={classe_ambientaleNuovo=="elettrica" ?"Se è alimentata elettrica può essere solo di classe elettrica" : ""} onChange={handleClasseAmbientaleChange}className="form-select form-select-sm">
                                    <option value="" disabled hidden>Seleziona una classe...</option>
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
                                        Elettrico
                                    </option>
                                </select>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted mb-1">N° Proprietari</p>
                                <input required onChange={handleNProprietariChange}type="number" min="1" className='form-control-sm form-control'></input>
                            </div>
                            
                        </div>
                        
                        


                        
                    </div>

                    <div className="modal-footer bg-light border-0">
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-success px-4">
                             Effettua la modifica
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleAddModal;