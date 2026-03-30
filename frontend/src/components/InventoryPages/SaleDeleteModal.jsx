import React from 'react';
import axios from 'axios';

const SaleDeleteModal = ({ selectedSale, setIsDeleteModalOpen, setSelectedSale, setVendite, setVeicoli }) => {
    if (!selectedSale) return null;

    const close = () => {
        setIsDeleteModalOpen(false);
        setSelectedSale(null);
    };

    const handleDelete = async () => {
        try {
            // 1. Eliminiamo la vendita dal DB
            const resDelete = await axios.delete(`https://gestioneconcessionaria.onrender.com/api/vendite/${selectedSale.id}/`);
            
            if (resDelete.status === 204 || resDelete.status === 200) {
                // 2. RIPRISTINO STATO VEICOLO: Riportiamo l'auto a 'disponibile'
                const resPatch = await axios.patch(
                    `https://gestioneconcessionaria.onrender.com/api/veicoli/${selectedSale.veicolo.id}/`, 
                    { stato: "disponibile" }
                );

                if (resPatch.status === 200) {
                    setVendite(prev => prev.filter(v => v.id !== selectedSale.id));
                    setVeicoli(prev => prev.map(v => v.id === selectedSale.veicolo.id ? resPatch.data : v));
                    
                    alert("Vendita annullata con successo. Il veicolo è tornato disponibile.");
                    close();
                }
            }
        } catch (error) {
            console.error("Errore durante l'eliminazione:", error.response?.data);
            alert("Errore tecnico durante l'annullamento della vendita.");
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1070 }}>
            <div className="modal-dialog modal-md modal-dialog-centered"> 
                <div className="modal-content border-0 shadow-lg">
                    
                    <div className="modal-header bg-dark text-white py-2">
                        <p className="modal-title fw-bold mb-0" style={{ fontSize: '0.9rem' }}>
                            Annulla Vendita: {selectedSale.veicolo.targa.toUpperCase()}
                        </p>
                        <button type="button" className="btn-close btn-close-white" onClick={close}></button>
                    </div>

                    <div className="modal-body p-4 text-center">
                        <i className="bi bi-exclamation-triangle text-danger fs-1 mb-3"></i>
                        <h5 className="fw-bold">Sei sicuro di voler procedere?</h5>
                        <p className="text-muted small">
                            Cancellando questa vendita, il record verrà eliminato definitivamente e la 
                            <strong> {selectedSale.veicolo.marca} {selectedSale.veicolo.modello}</strong> tornerà 
                            nello stato <span className="badge bg-success">disponibile</span>.
                        </p>
                        
                        {/* Box riassuntivo piccolo */}
                        <div className="bg-light p-2 rounded border mt-3">
                            <span className="text-muted small">Margine perso: </span>
                            <span className="fw-bold text-danger">€ {selectedSale.margine}</span>
                        </div>
                    </div>

                    <div className="modal-footer bg-light border-0 d-flex justify-content-between py-2">
                        <button type="button" className="btn btn-link text-secondary text-decoration-none small" onClick={close}>
                            No, mantieni vendita
                        </button>
                        <button type="button" className="btn btn-danger px-4 fw-bold" style={{ fontSize: '0.85rem' }}onClick={handleDelete}>
                            Sì, annulla e ripristina stock
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleDeleteModal;