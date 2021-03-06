import Relay from 'react-relay';
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import AuthenticatedApp from '../components/user/AuthenticatedApp';
import AnonymousApp from '../components/AnonymousApp';
import IdentityNumber from '../components/IdentityNumber';
import NINAAppointmentRequest from '../components/NINAAppointmentRequest';
import Dashboard from '../components/user/Dashboard';
import RAVECAppointmentRequest from '../components/RAVECAppointmentRequest';
import DefaultAppointmentRequest from '../components/DefaultAppointmentRequest';
import Login from '../components/user/Login';

class RouteHome extends Relay.Route {
    static queries = {
        viewer: (Component, vars) => Relay.QL`
          query {
            viewer(viewerId: $viewerId) {
                 ${Component.getFragment('viewer', vars)}
            }
          }
        `
    };

    static paramDefinitions = {
        viewerId: {required: false},
    };

    static routeName = 'AppHomeRoute';
}

function requireAuth(nextState, replace) {
    if(!JSON.parse(localStorage.getItem('user'))) {
        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function getParams(params, route){

    return {
        ...params,
        viewerId: (JSON.parse(localStorage.getItem('user')).id)
    }
}

function getAnonymousParams(params, route){

    return {
        ...params,
        viewerId: ''
    }
}

// ToDo : refactor all this
function getAnonymousDashboardParams(params, route){

    return {
        ...params,
        viewerId: ''
    }
}

export default  <Route>
                    <Route path="/" component={AnonymousApp} queries={RouteHome.queries} prepareParams={getAnonymousParams} >
                        <IndexRoute component={IdentityNumber} queries={RouteHome.queries} prepareParams={getAnonymousDashboardParams} />
                        <Route path="appointment/nina" component={NINAAppointmentRequest} queries={RouteHome.queries} prepareParams={getAnonymousParams} />
                        <Route path="appointment/ravec" component={RAVECAppointmentRequest} queries={RouteHome.queries} prepareParams={getAnonymousParams} />
                        <Route path="appointment/default" component={DefaultAppointmentRequest} queries={RouteHome.queries} prepareParams={getAnonymousParams} />
                    </Route>
                    <Route path="/admin" component={AuthenticatedApp} queries={RouteHome.queries} prepareParams={getParams} >
                        <IndexRoute component={Dashboard} queries={RouteHome.queries} prepareParams={getParams} onEnter={requireAuth} />
                    </Route>
                    <Route path="login" component={Login}  />
                </Route>