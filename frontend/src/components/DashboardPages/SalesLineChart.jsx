import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import './SalesLineChart.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,Tooltip, Legend);

const SalesLineChart=()=>{
    const [salesData, setVendite] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:8000/api/vendite/')
            .then(response => {
                setVendite(response.data);
            })
            .catch(error => {
                console.error("Errore API:", error);
            });
    }, []);
    const venditeMensili = new Array(12).fill(0); // Inizializza un array con 12 zeri
    const margineMensile = new Array(12).fill(0); // Inizializza un array con 12 zeri per i margini
    const meseLabels=new Array(12);
    const oggi=new Date();//data odierna
    let dataRiferimento=new Date(oggi.getFullYear()-1, oggi.getMonth()+1, 1); //data di riferimento per filtrare le vendite dell'ultimo anno
    const meseRiferimento=oggi.getMonth(); //mese odierno, per filtrare i dati fino al mese corrente
    for(let i=0;i<12;i++){
        switch((i+meseRiferimento+1)%12){
            case 0: meseLabels[i]="Gen"; break;
            case 1: meseLabels[i]="Feb"; break;
            case 2: meseLabels[i]="Mar"; break;
            case 3: meseLabels[i]="Apr"; break;
            case 4: meseLabels[i]="Mag"; break;
            case 5: meseLabels[i]="Giu"; break;
            case 6: meseLabels[i]="Lug"; break;
            case 7: meseLabels[i]="Ago"; break;
            case 8: meseLabels[i]="Set"; break;
            case 9: meseLabels[i]="Ott"; break;
            case 10: meseLabels[i]="Nov"; break;
            case 11: meseLabels[i]="Dic"; break;
        }
    } 
    let indiceMese=0;
    const venditeAnnuali=salesData.filter(sale=>new Date(sale.data_vendita)>=dataRiferimento);
    venditeAnnuali.forEach(sale => {
        indiceMese = new Date(sale.data_vendita).getMonth(); // Restituisce 0 per Gennaio, 1 per Febbraio...
        indiceMese = (indiceMese - (meseRiferimento+1) + 12  ) % 12; // Calcola l'indice corretto per il grafico
        venditeMensili[indiceMese] += Number(sale.prezzo_vendita_effettivo); // Incrementa il conteggio per quel mese
        margineMensile[indiceMese] += sale.margine; // Incrementa il margine per quel mese
    });
    const data={
            labels:meseLabels,
            datasets:[
                {
                    label:"Vendite Mensili",
                    data:venditeMensili,
                    fill:false,
                    borderColor:'rgba(75,192,192,1)',
                    tension:0.1,
                },
                {
                    label:"Margine Mensile",
                    data:margineMensile,
                    fill:false,
                    borderColor:'rgba(255,99,132,1)',
                    tension:0.1,
                }
            ]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                align: 'center',   // 'start', 'center', 'end' (allineamento orizzontale/verticale)
                labels: {
                    boxWidth: 15,    // Dimensione del quadratino colorato
                    padding: 10,     // Spazio tra le voci della legenda
                    font: {
                        size: 15     // Grandezza del testo
                    },
                }
            },
            tooltip: {
                enabled: true
            }
        },
        maintainAspectRatio: false, // Utile per far sì che il grafico occupi bene il contenitore
    };
    return (
        <div className='sales-stock-card rounded shadow p-4 mx-auto'>
            <h5 className='card-title text-center'>Analisi Vendite</h5>
            
            <div className="line-wrapper" >
                <Line data={data} options={options}/>
            </div>
        </div>
    );
}

export default SalesLineChart;

 