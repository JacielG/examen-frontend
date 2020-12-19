import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Nav } from '@fluentui/react';

import { Computadora } from '../../containers/computadora/computadora';
import { Marca } from '../../containers/marca/marca';
import './container.css';


export const Container = () => {
    return (
        <div className="container">
            <Nav
                selectedKey="key3"
                ariaLabel="Nav basic example"
                styles={{
                    root: {
                        width: 210,
                        height: '100%',
                        boxSizing: 'border-box',
                        border: '1px solid #eee',
                        overflowY: 'auto',
                    },
                }}
                groups={[{
                    links: [{
                        name: 'Computadoras',
                        url: '/containers/computadoras',
                        icon: 'UserFollowed',
                        key: 'estudiantesNav',
                    },
                    {
                        name: 'Marcas',
                        url: '/containers/marcas',
                        icon: 'Telemarketer',
                        key: 'profesoresNav',
                    },]
                }]}
            />
            <Router>
                <Switch>
                    <Route exact path="/containers/computadoras" component={Computadora} />
                    <Route exact path="/containers/marcas" component={Marca} />
                </Switch>
            </Router>
        </div>
    )
}