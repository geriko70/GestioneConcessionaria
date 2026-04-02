const SaleDetailModal = ({selectedSale, setIsDetailModalOpen, setSelectedSale}) => {
    if (!selectedSale) return null;

    const close = () => {
        setIsDetailModalOpen(false);
        setSelectedSale(null);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg">
                    
                    {/* Header Dinamico */}
                    <div className={`modal-header text-white bg-dark`}>
                        <h5 className="modal-title fw-bold">
                             Dettaglio: {selectedSale.veicolo.marca} {selectedSale.veicolo.modello} — {selectedSale.veicolo.targa.toUpperCase()}
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>

                    <div className="modal-body p-4">
                        {/* Riga 1: I "Big Three" (Dati che saltano all'occhio) */}
                        <div className="row text-center mb-4">
                            <div className="col-md-4 border-end">
                                <p className="text-muted small mb-1">CHILOMETRAGGIO</p>
                                <h4 className="fw-bold text-primary">{Number(selectedSale.veicolo.km).toLocaleString()} KM</h4>
                            </div>
                            <div className="col-md-4 border-end">
                                <p className="text-muted small mb-1">PREZZO LISTINO</p>
                                <h4 className="fw-bold text-success">€ {Number(selectedSale.veicolo.prezzo_listino).toLocaleString()}</h4>
                            </div>
                            <div className="col-md-4">
                                <p className="text-muted small mb-1">STATO STOCK</p>
                                <span className={`badge fs-6 bg-danger text-white`}>
                                    {selectedSale.veicolo.stato}
                                </span>
                            </div>
                        </div>

                        <hr />

                        {/* Riga 2: Specifiche Tecniche in Griglia */}
                        <div className="row g-3">
                            <h6 className="fw-bold text-uppercase small text-secondary mb-3">Caratteristiche Tecniche</h6> 
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Alimentazione</label>
                                <span className="fw-semibold text-capitalize">{selectedSale.veicolo.alimentazione}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Cambio</label>
                                <span className="fw-semibold text-capitalize">{selectedSale.veicolo.cambio}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Classe Ambientale</label>
                                <span className="fw-semibold text-uppercase">{selectedSale.veicolo.classe_ambientale}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">N° Proprietari</label>
                                <span className="fw-semibold">{selectedSale.veicolo.n_proprietari}</span>
                            </div>
                            <div className="col-6 col-md-3">
                                <label className="text-muted d-block small">Anno</label>
                                <span className="fw-semibold">{selectedSale.veicolo.anno}</span>
                            </div>
                        </div>

                        <hr />

                        {/* Riga 3: Dati Sensibili (Prezzo Acquisto e Margine) */}
                        <div className="bg-light p-3 rounded">
                            <h6 className="fw-bold text-uppercase small text-danger mb-2">Dati Vendita</h6>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <label className="text-muted small d-block">Comprata a</label>
                                    <span className="fw-bold">€ {Number(selectedSale.veicolo.prezzo_acquisto).toLocaleString()}</span>
                                </div>
                                <div>
                                    <label className="text-muted small d-block">Venduta a:</label>
                                    <span className="fw-bold">€ {Number(selectedSale.prezzo_vendita_effettivo).toLocaleString()}</span>
                                </div>
                                <div className="text-end">
                                    <label className="text-muted small d-block">Margine</label>
                                    <span className="fw-bold text-success fs-5">
                                         € {selectedSale.margine}
                                    </span>
                                </div>
                                <div>
                                    <label className="text-muted small d-block">Venduta il:</label>
                                    <span className="fw-bold">{(selectedSale.data_vendita).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer bg- border-0 ">
                        <div className="text text-center me-auto align-items-start">
                            <label className="text-muted small d-block">Venduta da</label>
                            <span className="fw-bold text-primary fs-5">{selectedSale.venditore}</span>
                        </div>
                        <button type="button" className="btn btn-secondary px-4" onClick={close}>Chiudi</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SaleDetailModal;