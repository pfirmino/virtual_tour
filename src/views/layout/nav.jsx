import React from 'react';
import {Link} from 'react-router-dom';

export default function Nav(props) {
    function GetTours() {
        fetch('/api/vtour')
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/products">Produtos</Link></li>
                    <li><Link to="/about">Sobre</Link></li>
                    <li><Link to="/tutorials">Tutoriais</Link></li>
                    <span className="separator"></span>
                    <li><form name="search-form" action="/search"><input type="search" name="q" placeholder="Buscar"/>
                        <button type="submit"><i className="fa fa-search"></i></button></form></li>
                    <li><Link to="/signup">Cadastrar</Link></li>
                    <li><Link to="/login">Entrar</Link></li>
                </ul>
            </nav>
        </>
    );
}