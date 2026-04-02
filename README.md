# 🏎️ Gestione Concessionaria Full-Stack
### *Sistema Gestionale Reattivo con Autenticazione JWT*

Questo progetto è una **Single Page Application (SPA)** progettata per la gestione operativa di una concessionaria. L'architettura è basata su un ecosistema disaccoppiato che garantisce velocità, sicurezza e manutenibilità.

---

## 🚀 Live Demo
**Link al progetto:** https://gestione-concessionaria.vercel.app/

> [!IMPORTANT]
> **Nota sulle prestazioni:** Il backend è ospitato su **Render (Piano Free)**. All'apertura, il database potrebbe richiedere **30-60 secondi** per "svegliarsi" dal cold start. Una volta attivo, le chiamate API saranno istantanee.

---

## 🔐 Sicurezza e Autenticazione (Security-First)
Il pilastro del progetto è il sistema di protezione dei dati:
* **JSON Web Token (JWT)**: Utilizzo di `django-rest-framework-simplejwt` per la generazione di token sicuri.
* **Scadenza Sessione**: I token hanno una durata limitata. Al termine della validità, l'app intercetta l'errore `401 Unauthorized` e reindirizza automaticamente l'utente al login, prevenendo accessi non autorizzati su postazioni dimenticate aperte.
* **Protezione Rotte**: Rendering condizionale in React; se il token non è presente nel `localStorage`, l'intera interfaccia gestionale viene smontata dal DOM.

---

## ✨ Funzionalità Integrate
* **Dashboard Analitica**: Visualizzazione in tempo reale dei ricavi totali e statistiche sui veicoli in inventario.
* **Gestione Inventario (CRUD)**:
    * Inserimento nuovi veicoli con validazione campi.
    * Modifica dati tecnici e prezzi.
    * Eliminazione record con aggiornamento ottimistico della UI.
* **Ricerca Avanzata**: Filtro dinamico sequenziale per **Targa, Marca e Modello**.
* **Ordinamento**: Gestione fluida delle tabelle per data, prezzo o chilometraggio.
* **User Info**: Memorizzazione dello username loggato per una personalizzazione dell'interfaccia.

---

## 🛠️ Tech Stack
| Tecnologia | Utilizzo |
| :--- | :--- |
| **Django & DRF** | API REST, Logica di Business e Database Management. |
| **React (Vite)** | Interfaccia utente reattiva e gestione degli stati. |
| **PostgreSQL** | Database relazionale per la persistenza dei dati. |
| **Bootstrap 5** | Design responsive e componenti UI professionali. |
| **Axios** | Gestione delle richieste HTTP con Header di Autorizzazione. |

---

## ⚙️ Architettura delle Chiamate API
Ogni operazione di scrittura o eliminazione nel sistema segue questo schema di autorizzazione:

```javascript
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};
// Esempio: axios.post(url, data, config)

##📦 Installazione Rapida
Segui questi passaggi per avviare il progetto in locale.

1. Clonazione del Progetto
git clone [LINK_DELLA_TUA_REPOSITORY]
cd [NOME_CARTELLA_PROGETTO]

2. Configurazione Backend (Django)
# Entra nella cartella backend
cd backend

# Crea un ambiente virtuale
python -m venv venv

# Attiva l'ambiente (Windows)
venv\Scripts\activate
# Attiva l'ambiente (Mac/Linux)
source venv/bin/activate

# Installa le dipendenze
pip install -r requirements.txt

# Esegui le migrazioni del database
python manage.py migrate

# Avvia il server
python manage.py runserver

3. Configurazione Frontend (React + Vite)
# Apri un nuovo terminale nella cartella frontend
cd frontend

# Installa i pacchetti Node
npm install

# Avvia l'applicazione in modalità sviluppo
npm run dev


📧 Contatti
Sviluppato da geriko70
Progetto realizzato per dimostrare competenze Full-Stack, gestione della sicurezza JWT e manipolazione dinamica dei dati in React.
GITHUB:https://github.com/geriko70/
LINKEDIN:www.linkedin.com/in/davide-orlandino-bb94a22ab
