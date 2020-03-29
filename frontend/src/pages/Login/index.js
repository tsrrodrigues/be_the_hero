import React,  { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi/';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function  Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();

        if(email === "admin" && password == "admin") {
            localStorage.setItem('admin', true);
            history.push('admin/ongs');
            return;
        }

        try {
            const response = await api.post('sessions', { email, password });
            localStorage.setItem('ongId', response.data.id);
            localStorage.setItem('ongName', response.data.name);
            history.push('profile');
        } catch (err) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}