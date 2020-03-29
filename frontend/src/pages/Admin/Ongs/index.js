import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiEdit, FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../../services/api';
import './styles.css';

import logoImg from '../../../assets/logo.svg';

export default function Profile() {
    const [ongs, setOngs] = useState([]);
    
    const history = useHistory(); 

    const admin = localStorage.getItem('admin');


    useEffect(() => {
        api.get('ongs', {}).then(response => {
            setOngs(response.data);
        })
    }, [admin]);

    async function handleDeleteOng (ongId) {
        try {
            await api.delete('ongs', {
                headers: {
                    Authorization: ongId,
                }
            });
        } catch (err) {
            alert('Erro ao deletar ONG, tente novamente.');
        }

        setOngs(ongs.filter(ong => ong.id !== ongId ));
    }

    async function handleEditOng (ongId, ongName) {
        localStorage.setItem('ongId', ongId);
        localStorage.setItem('ongName', ongName)
        history.push('detail');
    }

    function handleLogout () {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="admin-ongs-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo, Administrador</span>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>ONGs Cadastradas</h1>
            <ul>
                {ongs.map(ong => (
                    <li key={ong.id}>
                        <strong>NOME:</strong>
                        <p>{ong.name}</p>

                        <strong>E-MAIL:</strong>
                        <p>{ong.email}</p>

                        <strong>WHATSAPP:</strong>
                        <p>{ong.whatsapp}</p>

                        <strong>CIDADE:</strong>
                        <p>{ong.city}</p>

                        <strong>UF:</strong>
                        <p>{ong.uf}</p>

                        <div className="btn-ong">
                            <button
                                onClick={
                                    () => handleEditOng(ong.id, ong.name)}
                                type="button"
                            > <FiEdit size={20} color="#808080"/>
                            </button>
                            <button onClick={() => handleDeleteOng(ong.id)} type="button">
                                <FiTrash2 size={20} color="#808080"/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}