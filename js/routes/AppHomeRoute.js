import Relay from 'react-relay';
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import AuthenticatedApp from '../components/user/AuthenticatedApp';
import AnonymousApp from '../components/AnonymousApp';
import AppointmentRequest from '../components/AppointmentRequest';
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
                        <IndexRoute component={AppointmentRequest} queries={RouteHome.queries} prepareParams={getAnonymousDashboardParams} />
                    </Route>
                    <Route path="login" component={Login}  />
                </Route>