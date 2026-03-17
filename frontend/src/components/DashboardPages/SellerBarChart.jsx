import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './SellerBarChart.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

ChartJS.register(BarElement,CategoryScale,LinearScale, Tooltip, Legend);
const SellerBarChart=()=>{
    const [salesData, setVendite] = useState([]);
    useEffect(() => {
    axios.get('https://gestioneconcessionaria.onrender.com/api/vendite/')
            .then(response => {
                setVendite(response.data);
            })
            .catch(error => {
                console.error("Errore API:", error);
            });
    }, []);
    const venditoriTotali=salesData.map(sale=>sale.venditore);
    const venditori=[...new Set(venditoriTotali)];
    const venditePerVenditore=venditori.map(venditore=>{
        return salesData.filter(sale=>sale.venditore===venditore).length;
    });
    venditePerVenditore.sort((a,b)=>b-a); // Ordina in ordine decrescente
    const data={
      labels:venditori,
      datasets:[
        {
          label:"Venditori",
          data:venditePerVenditore,
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
          borderWidth:3,
        }
      ]
    }
    const options={
      indexAxis:'y'
    }
    return (
    <div className='seller-bar-sales-card rounded shadow  p-4 mx-auto'>
        <h5 className='card-title text-center'>I migliori venditori</h5>
        
        <div className="seller-bar-wrapper" >
            <Bar data={data} options={options}/>
        </div>
    </div>
);
}

export default SellerBarChart;

 