import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
    const q = useQuery();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    return (

        <article>
            <h2>Results for {q.get("q")} </h2>
            <p>Listando todos os resultados para {q.get("q")}... </p>
        </article>
    );
}