import { useEffect,useState } from "react";
import axios from "axios";
import "./StockTable.css"
import VehicleDetailModal from "./VehicleDetailModal";
//import VehicleModifyModal from "./VehicleModifyModal";
const StockTable = ( ) => {
    const [veicoli, setVeicoli] = useState([]);
    const [selectedVehicle,setSelectedVehicle]=useState(null);
    const [isVeichleModalOpen,setIsVehicleModalOpen]=useState(false);
    //const [isModifyModalOpen,setIsModifyModalOpen]=useState(false);

    const [filtroTarga, setFiltroTarga] = useState("");
    const [filtroMarca,setFiltroMarca]=useState("");
    const [filtroModello,setFiltroModello]=useState("");
    const [ordineVeicoli,setOrdineVeicoli]=useState("");
    const [showSortMenu,setShowSortMenu]=useState("");
    const handleOpenDetails=(veicolo)=>{
        setSelectedVehicle(veicolo);
        setIsVehicleModalOpen(true);
    }
    
    const handleMarcaChange=(e)=>{
        const marcaSelezionato=e.target.value;
        setFiltroMarca(marcaSelezionato);
        setFiltroModello("")
    }
    const handleTargaChange=(e)=>{
        const targaSelezionato=e.target.value;
        setFiltroTarga(targaSelezionato.toUpperCase());
    }
    const handleModelloChange=(e)=>{
        const modelloSelezionato=e.target.value;
        setFiltroModello(modelloSelezionato);
    }
    function handleFilterClear(){
        setFiltroMarca("");
        setFiltroModello("");
        setFiltroTarga("");
    }
    useEffect(() => {
        // Chiamata al backend Django
        axios.get('http://localhost:8000/api/veicoli/')
            .then(response => {
                setVeicoli(response.data);
            })
            .catch(error => {

                console.error("Errore API:", error);
            });
    }, []);
    const veicoliFiltrati=veicoli.filter(v=>
                    v.stato!=="venduto" && 
                    (filtroTarga=="" || v.targa.includes(filtroTarga)) &&
                    (filtroMarca=="" || v.marca===filtroMarca) && 
                    (filtroModello=="" || v.modello===filtroModello)
                )
    const veicoliOrdinati=veicoliFiltrati;
    switch (ordineVeicoli){
        case "prezzo_crescente":
                veicoliOrdinati.sort((a,b)=>a.prezzo_listino - b.prezzo_listino)
            break;
        case "prezzo_decrescente":
            veicoliOrdinati.sort((a,b)=>b.prezzo_listino - a.prezzo_listino)
            break;
        case "kilometraggio_crescente":
            veicoliOrdinati.sort((a,b)=>a.km - b.km)
            break;
        case "kilometraggio_decrescente":
            veicoliOrdinati.sort((a,b)=>b.km - a.km)
            break;
        default:
            break;
    }

    const veicoliFiltratiMarca=[...new Set(veicoli.filter(v=>
                            (filtroTarga=="" || v.targa.includes(filtroTarga) && v.stato!=="venduto"))
                            .map(v => v.marca))]
    
    const veicoliFiltratiModello=[...new Set(veicoli.filter(v => v.marca===filtroMarca && v.stato!=="venduto" && (filtroTarga=="" || v.targa.includes(filtroTarga))).map(v=>v.modello))];
    return (
        <div>
        <table className="table table-striped shadow-sm">
            <thead>
            <tr>
                {/*FILTRO TARGA*/}
                <th style={{width:"18%"}}>
                    <div className="d-flex gap-2">
                        <span className="gap">Targa</span>
                        <input placeholder="Cerca Targa" onChange={handleTargaChange}className="card form-select-sm" type="search"></input>
                    </div>
                </th>
                {/*FILTRO MARCA*/}
                <th style={{width:"18%"}}>
                    <div className="d-flex gap-2">
                    <span>Marca</span>
                    <select value={filtroMarca} onChange={handleMarcaChange} className="form-select-sm" name="brand_input" id="brand_input">
                        <option value="">Tutte le marche</option>
                        {
                        veicoliFiltratiMarca.sort().map((marca) => (
                            <option key={marca} value={marca}>
                                {marca}
                            </option>
                        ))
                        }
                    </select>
                    </div>
                </th>
                {/*FILTRO MODELLO*/}
                <th style={{width:"10%"}}>
                    <div className="d-flex gap-2">
                    <span>Modello</span>
                    <select value={filtroModello} onChange={handleModelloChange} disabled={!filtroMarca} title={filtroMarca ? "" : "Prima seleziona la marca!"} className="form-select-sm" name="model_input" id="model_input">
                        <option value="">Tutti i modelli</option>
                        {
                        veicoliFiltratiModello.sort().map((modello) => (
                            <option key={modello} value={modello}>
                                {modello}
                            </option>
                        ))
                    }
                    </select>
                    </div>
                </th>
                <th className="text-end"style={{width:"14%"}}>
                    <span>Prezzo Listino</span>
                </th>
                <th className="text-end" style={{width:"14%"}}>
                    <span >Kilometraggio</span>
                </th>
                <th className="text-center" style={{width:"26%"}}>
                    <div className="btn-group gap-2">
                    <div className="dropdown">
                        <button className="btn btn-sm btn-primary dropdown-toggle" onClick={() => setShowSortMenu(!showSortMenu)}>
                            Ordina per
                        </button>
                        
                        {/* Mostriamo il menu solo se showSortMenu è true */}
                        <div className={`dropdown-menu ${showSortMenu ? 'show' : ''}`} 
                            style={{ display: showSortMenu ? 'block' : 'none', right: 0, left: 'auto' }}>
                            <button className="dropdown-item" onClick={() => { setOrdineVeicoli(""); setShowSortMenu(false); }}>Niente</button>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={() => { setOrdineVeicoli("prezzo_crescente"); setShowSortMenu(false); }}>Prezzo crescente</button>
                            <button className="dropdown-item" onClick={() => { setOrdineVeicoli("prezzo_decrescente"); setShowSortMenu(false); }}>Prezzo decrescente</button>
                            <hr className="dropdown-divider" />
                            <button className="dropdown-item" onClick={() => { setOrdineVeicoli("kilometraggio_crescente"); setShowSortMenu(false); }}>Km crescente</button>
                            <button className="dropdown-item" onClick={() => { setOrdineVeicoli("kilometraggio_decrescente"); setShowSortMenu(false); }}>Km decrescente</button>
                        </div>
                    </div>
                
                        <button className="btn btn-sm btn-secondary "  onClick={handleFilterClear}>
                            Ripristina filtri
                        </button>
                        <button className="btn btn-sm btn-success"  onClick={handleFilterClear}>
                            + Aggiungi Veicolo
                        </button>
                    </div>
                </th>
            </tr>   
        </thead>
            <tbody >
                {veicoliOrdinati.length>0 ? (veicoliFiltrati.sort().map((veicolo, index) => (
                <tr className="py-4" key={veicolo.id}>
                    <td >
                        <span className="badge bg-dark mx-1">{index+1}</span>
                        <span className="badge bg-light text-black">
                            {veicolo.targa.toUpperCase()}
                        </span>
                    </td>
                    <td >{veicolo.marca}</td>
                    <td >{veicolo.modello}</td>
                    <td className=" text-end ">€ {veicolo.prezzo_listino}</td>
                    <td className=" text-end ">{veicolo.km.toLocaleString()} km</td>
                    <td className=" text-center ">
                        <div className="btn-group gap-4">
                            <button onClick={() => handleOpenDetails(veicolo)} className="sell-button btn btn-sm btn-info">Info</button>
                            <button className="btn btn-sm btn-outline-success">Vendi</button>
                            <button className="btn btn-sm btn-warning">Modifica</button>
                        </div>
                    </td>
                </tr>
                ))):(
                    <tr >
                        <td colSpan={6}>
                            Nessun risultato trovato...
                        </td>
                    </tr>
                )
                }
            </tbody>
        </table>
        {isVeichleModalOpen===true && 
            <VehicleDetailModal 
            setSelectedVehicle={setSelectedVehicle} 
            selectedVehicle={selectedVehicle} 
            setIsVehicleModalOpen={setIsVehicleModalOpen}
            />
        }  
        </div>
    );
}

export default StockTable;