import React from 'react';
import Relay from 'react-relay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';
import moment from 'moment';


export default class Property extends React.Component {

    render() {

        var appointment = this.props.appointment;
        let pathname = this.context.location.pathname != '/' ? this.context.location.pathname: '';



        return <tr>
            <td>{appointment.status}</td>
            <td>{appointment.date}</td>
            <td>{appointment.firstName + appointment.lastName}</td>
            <td>{appointment.nina? 'NINA' : (appointment.receipt? 'RECEIPT': 'DEFAULT')}</td>
        </tr>
    }
}

Property.contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
};