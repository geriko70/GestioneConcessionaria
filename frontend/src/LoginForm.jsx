import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Chiamata all'endpoint che abbiamo configurato in Django
            const response = await axios.post('https://gestioneconcessionaria.onrender.com/api/token/', {
                username: username,
                password: password
            });

            if (response.status === 200) {
                const token = response.data.access;
                // Comunichiamo ad App.jsx che il login è riuscito
                onLoginSuccess(token);
            }
        } catch (err) {
            console.error("Errore Login:", err.response?.data);
            setError("Credenziali non valide. Riprova.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
            <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h3 className="fw-bold text-primary">Gestionale Orly</h3>
                        <p className="text-muted small">Inserisci le tue credenziali per accedere</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Username</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="Nome utente"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold">Password</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg fs-6" 
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small text-center" role="alert">
                                {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 btn-lg fs-6 fw-bold shadow-sm"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                            ) : "Accedi"}
                        </button>
                    </form>
                </div>
                <div className="card-footer bg-light text-center py-3 border-0" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                    <small className="text-muted">© 2024 Gestione Concessionaria</small>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;