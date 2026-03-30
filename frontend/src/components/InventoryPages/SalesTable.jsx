import { useState } from "react";
import SaleDetailModal from "./SaleDetailModal";
import SaleDeleteModal from "./SaleDeleteModal";
const SalesTable = ({vendite,setVeicoli,setVendite}) => {
    const [selectedSale,setSelectedSale]=useState(null);
    const [isDetailModalOpen,setIsDetailModalOpen]=useState(false);
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false);
    const [showSortMenu,setShowSortMenu]=useState(false);
    const [filtroData, setFiltroData] = useState("");
    const [filtroTarga,setFiltroTarga]=useState("");
    const [ordineVendita,setOrdineVendita]=useState("data_recente");
    const handleTargaChange=(e)=>{
        setFiltroTarga(e.target.value.toUpperCase());
    }
    const handleDataChange=(e)=>{
        setFiltroData(e.target.value);
    }
    const handleOpenDetails=(vendita)=>{
        setSelectedSale(vendita);
        setIsDetailModalOpen(true);
    }
    const handleOpenDelete=(vendita)=>{
        setSelectedSale(vendita);
        setIsDeleteModalOpen(true);
    }
    function handleFilterClear(){
        setFiltroTarga("");
        setFiltroData("");
    }
    const venditeFiltrate=vendite.filter((v)=>
        (filtroTarga==""||v.veicolo.targa.includes(filtroTarga)) &&
        (filtroData=="" ||v.data_vendita==filtroData)
    );
    const venditeOrdinate=venditeFiltrate;
    switch (ordineVendita) {
    case "prezzo_crescente":
        venditeOrdinate.sort((a, b) => a.prezzo_vendita_effettivo - b.prezzo_vendita_effettivo);
        break;
    case "prezzo_decrescente":
        venditeOrdinate.sort((a, b) => b.prezzo_vendita_effettivo - a.prezzo_vendita_effettivo);
        break;
    case "data_crescente":
        // Convertiamo in oggetto Date per il confronto
        venditeOrdinate.sort((a, b) => new Date(b.data_vendita) - new Date(a.data_vendita));
        break;
    case "data_decrescente":
        venditeOrdinate.sort((a, b) => new Date(a.data_vendita) - new Date(b.data_vendita));
        break;
    default:
        break;
}
    return (
        <div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th style={{width:"20%"}}>
                        <div className="d-flex gap-2">
                            <span className="gap">Targa</span>
                            <input value={filtroTarga} placeholder="Cerca Targa" onChange={handleTargaChange}className="card form-select-sm" type="search"></input>
                        </div>
                    </th>

                    <th style={{ width: '20%' }}>
                        <div className="d-flex">Prezzo Vendita</div>
                    </th>

                    <th style={{ width: '20%' }} >
                        <div className="d-flex gap-2"><span>Data</span>
                        <input type="date" value={filtroData} onChange={handleDataChange} className="form-control form-control-sm " style={{ width: '40%' }}/>
                        </div>
                    </th>
                    
                    <th style={{ width: '20%' }} >
                        <div className="d-flex">Margine</div>
                    </th>
                    
                    <th style={{width:"20%"}} className="">
                        <div className="btn-group gap-2">
                            <button className="btn btn-sm btn-primary dropdown-toggle" onClick={() => setShowSortMenu(!showSortMenu)}>
                                    Ordina per
                                </button>
                            <div className="dropdown">
                                <div className={`dropdown-menu ${showSortMenu ? 'show' : ''}`} 
                                    style={{ display: showSortMenu ? 'block' : 'none', right: 0, left: 'auto' }}>
                                    <button className="dropdown-item" onClick={() => { setOrdineVendita("data_crescente"); setShowSortMenu(false); }}>data crescente</button>
                                    <button className="dropdown-item" onClick={() => { setOrdineVendita("data_decrescente"); setShowSortMenu(false); }}>data decrescente</button>
                                    <hr className="dropdown-divider" />
                                    <button className="dropdown-item" onClick={() => { setOrdineVendita("prezzo_crescente"); setShowSortMenu(false); }}>Prezzo crescente</button>
                                    <button className="dropdown-item" onClick={() => { setOrdineVendita("prezzo_decrescente"); setShowSortMenu(false); }}>Prezzo decrescente</button>
                                </div>
                                <button className="btn btn-sm btn-secondary"  onClick={handleFilterClear}>
                                    Ripristina filtri
                                </button>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                {venditeOrdinate.length>0 ? (venditeOrdinate.map((vendita,index ) => (
                <tr key={vendita.id}>
                    <td >
                        <span className="badge bg-dark" >{index+1}</span>
                        <span className="badge bg-light text-black">
                            {vendita.veicolo.targa.toUpperCase()}
                        </span>
                    </td>
                    <td >€ {(Number)(vendita.prezzo_vendita_effettivo)}</td>
                    <td>{vendita.data_vendita}</td>
                    <td>€ {vendita.margine}</td>
                    <td className="text-start">
                        <div className="btn-group gap-4">
                            <button onClick={() => handleOpenDetails(vendita)} className="sell-button btn btn-sm btn-info">Info</button>
                            <button className="modify-button btn btn-sm btn-warning">Modifica</button>
                            <button onClick={() => handleOpenDelete(vendita)} className="delete-button btn btn-sm btn-danger">Elimina</button>
                        </div>
                    </td>
                </tr>
                ))):(<tr >
                        <td colSpan={6}>
                            Nessun risultato trovato...
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
        {isDetailModalOpen===true && 
            <SaleDetailModal
            setSelectedSale={setSelectedSale}
            selectedSale={selectedSale} 
            setIsDetailModalOpen={setIsDetailModalOpen}
            />
        } 
        {isDeleteModalOpen===true && 
            <SaleDeleteModal
            setSelectedSale={setSelectedSale}
            selectedSale={selectedSale} 
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setVendite={setVendite}
            setVeicoli={setVeicoli}
            />
        }   
        </div>
    );
}

export default SalesTable;