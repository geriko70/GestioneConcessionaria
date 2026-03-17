import React, { useState, useEffect } from 'react'; // Aggiunto per la gestione dei dati
import { Bar } from 'react-chartjs-2';
// RIMOSSO: import { initialVehicles } from '../data/vehicles'; 
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './BrandBarChart.css';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BrandBarChart = () => {
    // --- NUOVA LOGICA DI STATO ---
    const [veicoli, setVeicoli] = useState([]);

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

    // --- TUA LOGICA ORIGINALE (Adattata alla variabile 'veicoli') ---
    const brandDisponibili = veicoli
        .filter(v => v.stato !== "venduto" && v.stato !== "venduta")
        .map(v => v.marca);

    const brandFiltrati = [...new Set(brandDisponibili)]; 
    
    const veicoliPerBrand = brandFiltrati.map(marca => {
        return brandDisponibili.filter(b => b === marca).length;
    });

    // Nota: Ho lasciato il tuo sort originale, ma ricorda che se i dati sono molti 
    // l'ordine dei brand e dei numeri potrebbe scoordinarsi se non sono legati.
    veicoliPerBrand.sort((a, b) => b - a); 

    const data = {
      labels: [...brandFiltrati],
      datasets: [
        {
          label: "Veicoli",
          data: [...veicoliPerBrand],
          backgroundColor: [
            'rgba(75,192,192,0.6)',
            'rgba(255,99,132,0.6)',
            'rgba(255,206,86,0.6)',
            'rgba(54,162,235,0.6)',
          ],
          borderColor: [
            'rgba(75,192,192,1)',
            'rgba(255,99,132,1)',
            'rgba(255,206,86,1)',
            'rgba(54,162,235,1)',
          ],
          borderWidth: 3,
        }
      ]
    }

    const options = {
      indexAxis: 'y'
    }

    // --- TUO HTML/JSX ORIGINALE INVARIATO ---
    return (
        <div className='brand-pie-stock-card rounded shadow p-4 mx-auto'>
            <h5 className='card-title text-center'>Le marche più presenti</h5>
            
            <div className="brand-pie-wrapper">
                <Bar data={data} options={options}/>
            </div>
        </div>
    );
}

export default BrandBarChart;