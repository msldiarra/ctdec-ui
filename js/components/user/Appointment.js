import React from 'react';
import Relay from 'react-relay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';
import moment from 'moment';


export default class Appointment extends React.Component {

    render() {

        var appointment = this.props.appointment;
        let pathname = this.context.location.pathname != '/' ? this.context.location.pathname: '';

        var name = (appointment.lastName && appointment.firstName) ? appointment.firstName + ' ' + appointment.lastName: '';
        var status;

        if(appointment.status == 'PLANNED') {
            status =  <i className="fa fa-square orange" aria-hidden="true"></i>
        } else if (appointment.status == 'PROCESSED') {
            status =  <i className="fa fa-square green" aria-hidden="true"></i>
        } else if(appointment.status == 'ISSUED') {
            status =  <i className="fa fa-square grey" aria-hidden="true"></i>
        }

        return (
        <tr>
            <td>{status}</td>
            <td>{moment(appointment.date).format('DD-MM-YYYY')}</td>
            <td>{appointment.location}</td>
            <td>{name}</td>
            <td>{appointment.nina? 'NINA' : (appointment.receipt? 'RECEIPT': 'DEFAULT')}</td>
        </tr> )
    }
}

Appointment.contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
};