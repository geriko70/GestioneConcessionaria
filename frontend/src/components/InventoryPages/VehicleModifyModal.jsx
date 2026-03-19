import {useState} from 'react';
const VehicleModifyModal = ({ selectedVehicle, setIsModifyModalOpen, setSelectedVehicle }) => {
    const [cambioModifica,setCambioModifica]=useState("");
    //const [chilometriModifica,setChilometriModifica]=useState("");
    //const [prezzoListinoModifica,setPrezzoListinoModifica]=useState("");
    const [statoModifica,setStatoModifica]=useState("");
    const [classe_ambientaleModifica,setClasse_ambientaleModifica]=useState("");
    const [alimentazioneModifica,setAlimentazioneModifica]=useState("");
    //const [targaModificata,setTargaModificata()]=useState("");
    //const [targaModificata,setTargaModificata()]=useState("");

    
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
                                <input className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-md-3 border-end">
                                <p className="text-muted mb-1">PREZZO DI LISTINO </p>
                                <span className="fw-semibold">{Number(selectedVehicle.prezzo_listino).toLocaleString()} €</span>
                                <input className="form-control form-control-sm"type="text" ></input>
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
                                <select value={alimentazioneModifica} onChange={handleAlimentazioneChange}className="form-select form-select-sm">
                                    <option value="transito">
                                        Benzina
                                    </option>
                                    <option value="officina">
                                        Diesel
                                    </option>
                                    <option value="Metano">
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
                                <input className="form-control form-control-sm"type="text" ></input>
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
                                <select disabled={(alimentazioneModifica=="elettrica"||selectedVehicle.alimentazione=="elettrica")} value={(alimentazioneModifica=="elettrica"||selectedVehicle.alimentazione=="elettrica")?"elettrico":classe_ambientaleModifica} title={(alimentazioneModifica=="elettrica"||selectedVehicle.alimentazione=="elettrica")?"Se è alimentata elettrica può essere solo di classe elettrica" : ""} onChange={setClasse_ambientaleModifica}className="form-select form-select-sm">
                                    <option value="euro4">
                                        Euro 4
                                    </option>
                                    <option value="euro5">
                                        Automatico
                                    </option>
                                    <option value="euro6">
                                        Euro 4
                                    </option>
                                    <option value="elettrico">
                                        Elettrico
                                    </option>
                                </select>
                            </div>
                            <div className="col-6 col-md-3">
                                <p className="text-muted mb-1">N° Proprietari</p>
                                <span className="fw-semibold">{selectedVehicle.n_proprietari}</span>
                                <input type="number" placeholder={selectedVehicle.n_proprietari} start={selectedVehicle.n_proprietari} min="1" className='form-control-sm form-control'></input>
                            </div>
                            
                        </div>

                        <hr />

                        {/* Riga 3: Dati Sensibili (Prezzo Acquisto e Margine) */}
                        <div className="row text-center g-3">
                            <div className="col-6 border-end">
                                <p className="text-muted mb-1">TARGA </p>
                                    <span className="fw-semibold">{(selectedVehicle.targa).toLocaleString()} </span>
                                <input className="form-control form-control-sm"type="text" ></input>
                            </div>
                            <div className="col-6 border-end">
                                <p className="text-muted mb-1 ">Prezzo acquisto </p>
                                    <span className="fw-semibold">{(selectedVehicle.prezzo_acquisto).toLocaleString()} </span>
                                <input className="form-control form-control-sm"type="text" ></input>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer bg-light border-0">
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                        <button type="button" className="btn btn-warning px-4">
                             Effettua la modifica
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleModifyModal;