import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../../services/api';
import './styles.css';

import logoImg from '../../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory(); 

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident (id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }

        setIncidents(incidents.filter(incident => incident.id !== id ));
    }

    function handleLogout () {
        localStorage.clear();
        history.push('/');
    }

    function handleBack() {
        localStorage.removeItem('ongId');
        localStorage.removeItem('ongName');
        history.push('/admin/ongs');
    }

    return (
        <div className="admin-detail-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, Administrador</span>

                <button onClick={handleBack} className="button" >Voltar Página</button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados de <i>{ongName}</i></h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <div className="btn-incident">
                            {/* <button onClick={
                                () => handleEdit(incident)}
                                type="button">
                                <FiEdit size={20} color="#808080"/>
                            </button> */}

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#808080"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}