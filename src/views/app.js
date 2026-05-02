import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './app.css';

import Nav from './layout/nav';
import Main from './layout/main';
import Footer from './layout/footer';

export default function App(props) {
    return (
        <>
            <Router>
                <Nav />
                <Main/>
                <Footer />
            </Router>
        </>
    );
}