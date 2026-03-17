import { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";
const SalesTable = ({vendite}) => {
    const [selectedSale,setSelectedSale]=useState(null);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const handleOpenDetails=(vendita)=>{
        setSelectedSale(vendita);
        setIsModalOpen(true);
    }

    return (
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th style={{ width: '20%' }} scope="col">Targa</th>
                    <th style={{ width: '20%' }} scope="col">Prezzo Vendita</th>
                    <th style={{ width: '20%' }} scope="col">Data</th>
                    <th style={{ width: '20%' }} scope="col">Margine</th>
                    <th style={{ width: '20%' }}scope="col">Azioni</th>
                </tr>
            </thead>
            <tbody>
                {vendite.map((vendita,index ) => (
                <tr key={vendita.id}>
                    <td >
                        <span className="badge bg-dark" >{index+1}</span>
                        <span className="badge bg-light text-black">
                            {vendita.veicolo.targa.toUpperCase()}
                        </span>
                    </td>
                    <td >{vendita.prezzo_vendita_effettivo}</td>
                    <td>{vendita.data_vendita}</td>
                    <td>€ {vendita.margine}</td>
                    <td>
                        <div className="d-flex gap-2">
                            <button onClick={() => handleOpenDetails(vendita)} className="sell-button btn btn-sm btn-info">Info</button>
                            <button className="modify-button btn btn-sm btn-warning">Modifica</button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        {isModalOpen===true && 
            <SaleDetailModal
            setSelectedSale={setSelectedSale}
            selectedSale={selectedSale} 
            setIsModalOpen={setIsModalOpen}
            />
        }  
        </div>
    );
}

export default SalesTable;