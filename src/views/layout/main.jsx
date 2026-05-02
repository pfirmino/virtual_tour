import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './header';
import Home from '../pages/home';
import About from '../pages/about';
import NotFound from '../pages/notfound';
import Search from '../pages/search'
import SignUp from '../pages/signup';

export default function Main(props) {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <Header />
                </Route>
            </Switch>
            <main>
                <Switch>
                    <Route path="/about">
                        <About></About>
                    </Route>
                    <Route path="/search">
                        <Search></Search>
                    </Route>
                    <Route path="/signup">
                        <SignUp></SignUp>
                    </Route>
                    <Route exact path="/">
                        <Home></Home>
                    </Route>
                    <Route path="*">
                        <NotFound></NotFound>
                    </Route>
                </Switch>
            </main>

        </>
    );
}