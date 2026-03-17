const VehicleDetailModal = ({ selectedVehicle, setIsVehicleModalOpen, setSelectedVehicle }) => {
    if (!selectedVehicle) return null;

    const close = () => {
        setIsVehicleModalOpen(false);
        setSelectedVehicle(null);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    
                    {/* Header Dinamico */}
                    <div className={`modal-header text-white bg-dark`}>
                        <h5 className="modal-title fw-bold">
                             Dettaglio: {selectedVehicle.marca} {selectedVehicle.modello} — {selectedVehicle.targa.toUpperCase()}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>

                    <div className="modal-body p-4">
                        {/* Riga 1: I "Big Three" (Dati che saltano all'occhio) */}
                        <div className="row text-center mb-4">
                            <div className="col-md-4 border-end">
                                <p className="text-muted small mb-1">CHILOMETRAGGIO</p>
                                <h4 className="fw-bold text-primary">{Number(selectedVehicle.km).toLocaleString()} KM</h4>
                            </div>
                            <div className="col-md-4 border-end">
                                <p className="text-muted small mb-1">PREZZO LISTINO</p>
                                <h4 className="fw-bold text-success">€ {Number(selectedVehicle.prezzo_listino).toLocaleString()}</h4>
                            </div>
                            <div className="col-md-4">
                                <p className="text-muted small mb-1">STATO STOCK</p>
                                <span className={`badge fs-6 ${selectedVehicle.stato === 'disponibile' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                    {selectedVehicle.stato.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <hr />

                        {/* Riga 2: Specifiche Tecniche in Griglia */}
                        <div className="row g-3">
                            <h6 className="fw-bold text-uppercase small text-secondary mb-3">Caratteristiche Tecniche</h6>
                            
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Alimentazione</label>
                                <span className="fw-semibold text-capitalize">{selectedVehicle.alimentazione}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Cambio</label>
                                <span className="fw-semibold text-capitalize">{selectedVehicle.cambio}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Classe Ambientale</label>
                                <span className="fw-semibold text-uppercase">{selectedVehicle.classe_ambientale}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">N° Proprietari</label>
                                <span className="fw-semibold">{selectedVehicle.n_proprietari}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Anno</label>
                                <span className="fw-semibold">{selectedVehicle.anno}</span>
                            </div>
                        </div>

                        <hr />

                        {/* Riga 3: Dati Sensibili (Prezzo Acquisto e Margine) */}
                        <div className="bg-light p-3 rounded">
                            <h6 className="fw-bold text-uppercase small text-danger mb-2">Dati Riservati</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="text-muted small d-block">Costo d'acquisto</label>
                                    <span className="fw-bold">€ {Number(selectedVehicle.prezzo_acquisto).toLocaleString()}</span>
                                </div>
                                <div className="text-end">
                                    <label className="text-muted small d-block">Margine Lordo Stimato</label>
                                    <span className="fw-bold text-danger fs-5">
                                        + € {(selectedVehicle.prezzo_listino - selectedVehicle.prezzo_acquisto).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer bg-light border-0">
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                        <button type="button" className="btn btn-primary px-4">
                             Stampa Etichetta Prezzo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VehicleDetailModal;