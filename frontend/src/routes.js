import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Edit from './pages/Edit';
import AdminOngs from './pages/Admin/Ongs';
import AdminDetail from './pages/Admin/Detail';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
                <Route path="/edit" component={Edit} />
                <Route path="/admin/ongs" component={AdminOngs} />
                <Route path="/admin/detail" component={AdminDetail} />
            </Switch>
        </BrowserRouter>
    );
}