import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState(localStorage.getItem('title'));
    const [description, setDescription] = useState(localStorage.getItem('description'));
    const [value, setValue] = useState(localStorage.getItem('value'));
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const id = localStorage.getItem('id');

    async function handleEditIncident (e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.put(`edit/${id}`, data, {
                headers: {
                    Authorization: ongId,
                }
            });
            localStorage.removeItem('id');
            localStorage.removeItem('title');
            localStorage.removeItem('description');
            localStorage.removeItem('value');
            history.push('/profile');
        } catch (err) {
            alert("Erro ao editar caso, tente novamente.");
        }
    }

    console.log(id);

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Editar caso</h1>
                    <p>
                        Edites os campos desejados ao lado.
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleEditIncident}>
                    <input
                        value={title}
                        onChange={ e => setTitle(e.target.value)}
                    />
                    <textarea 
                        value={description}
                        onChange={ e => setDescription(e.target.value)}                      
                    />
                    <input 
                        value={value}
                        onChange={ e => setValue(e.target.value)}
                    />

                    <button onClick={
                        () => {setValue(value.replace(',', '.'))}
                    } className="button" type="submit">Editar</button>
                </form>
            </div>
        </div>
    );
}