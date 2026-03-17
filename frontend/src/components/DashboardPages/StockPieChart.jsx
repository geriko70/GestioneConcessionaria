import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './StockPieChart.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);
const StockPieChart=()=>{
    const [veicoli, setVeicoli] = useState([]);
    const [vendite, setVendite] = useState([]);
    useEffect(() => {
    axios.get('https://gestioneconcessionaria.onrender.com/api/veicoli/')
            .then(response => {
                setVeicoli(response.data);
            })
            .catch(error => {
                console.error("Errore API:", error);
            });
    axios.get('https://gestioneconcessionaria.onrender.com/api/vendite/')
            .then(response => {
                setVendite(response.data);
            })
            .catch(error => {
                console.error("Errore API:", error);
            });
    }, []);
    const oggi = new Date().toISOString().split('T')[0];
    const disponibili=veicoli.filter(v=>v.stato==="disponibile").length;
    const officina=veicoli.filter(v=>v.stato==="officina").length;
    const transito=veicoli.filter(v=>v.stato==="transito").length;
    const vendutiOggi=vendite.filter(v=>v.data_vendita===oggi).length;
    const data={
      labels:["Disponibili","Venduti Oggi","In Officina","In Transito"],
      datasets:[
        {
          label:"Veicoli",
          data:[disponibili,vendutiOggi,officina,transito],
          backgroundColor:[
            'rgba(75,192,192,0.6)',
            'rgba(255,99,132,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(54,162,235,0.6)',
          ],
          borderColor:[
            'rgba(75,192,192,1)',
            'rgba(255,99,132,1)',
            'rgba(255,206,86,1)',
            'rgba(54,162,235,1)',
          ],
          borderWidth:4,
          spacing: 0.1, 
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
    <div className='pie-stock-card rounded shadow p-4 mx-auto'>
        <h5 className='card-title text-center'>Analisi Stock</h5>
        
        <div className="pie-wrapper" >
            <Pie data={data} options={options}/>
        </div>
    </div>
);
}

export default StockPieChart;

 