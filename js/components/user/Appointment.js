import React from 'react';
import Relay from 'react-relay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Link} from 'react-router';
import moment from 'moment';
import AssignAppointmentToUser from '../mutation/AssignAppointmentToUserMutation'
import ReleaseAppointmentAssignment from '../mutation/ReleaseAppointmentAssignmentMutation'
import UserService from '../service/AuthService'


export default class Appointment extends React.Component {

    onAppointmentAssign(appointmentNumber) {

        var assignAppointmentToUser = new AssignAppointmentToUser({
            viewer: this.props.viewer,
            viewerId: this.props.viewer.id,
            appointmentNumber: appointmentNumber,
            userId: UserService.getUserId()
        });

        var onSuccess = () => console.log("OK!");

        var onFailure = (transaction) => this.setState({message : "Désolé, nous avons rencontré un problème lors de l'enregistrement." +
        " Contactez l'administrateur"});

        Relay.Store.commitUpdate(assignAppointmentToUser, {onSuccess, onFailure})

    }

    onAppointmentReleaseAssignment(appointmentNumber) {

        var releaseAppointmentAssignment = new ReleaseAppointmentAssignment({
            viewer: this.props.viewer,
            viewerId: this.props.viewer.id,
            appointmentNumber: appointmentNumber,
            userId: UserService.getUserId()
        });

        var onSuccess = () => console.log("Assignment released !");

        var onFailure = (transaction) => this.setState({message : "Désolé, nous avons rencontré un problème lors de l'enregistrement." +
        " Contactez l'administrateur"});

        Relay.Store.commitUpdate(releaseAppointmentAssignment, {onSuccess, onFailure})
    }


    render() {

        var appointment = this.props.appointment;
        let pathname = this.context.location.pathname != '/' ? this.context.location.pathname: '';

        var name = (appointment.lastName && appointment.firstName) ? appointment.firstName + ' ' + appointment.lastName: '';
        var status, processing, disabled ="";

        if(appointment.status == 'PLANNED') {
            status =  <i className="fa fa-square orange" aria-hidden="true"></i>
        } else if (appointment.status == 'PROCESSED') {
            status =  <i className="fa fa-square green" aria-hidden="true"></i>
        } else if(appointment.status == 'ISSUED') {
            status =  <i className="fa fa-square grey" aria-hidden="true"></i>
        }

        if(appointment.processingHistory.edges.length > 0 && !appointment.processingHistory.edges[0].node.end_date) {

            if(appointment.processingHistory.edges[0].node.user.login == UserService.getUserLogin()) {
                processing = <button onClick={this.onAppointmentReleaseAssignment.bind(this,appointment.number)} type="button" className={"btn btn-default"}>{"Ne plus traiter"}</button>
            }
            else {
                var user = appointment.processingHistory.edges[0].node.user;
                processing = <button onClick={this.onAppointmentAssign.bind(this,appointment.number)} type="button" className={"btn btn-default disabled"}>{user.firstName + " traite le RDV"}</button>
            }
        } else {
            processing = <button onClick={this.onAppointmentAssign.bind(this,appointment.number)} type="button" className={"btn btn-default " + disabled}>Traiter le RDV</button>
        }

        return (
        <tr>
            <td>{status}</td>
            <td>{moment(appointment.date).format('DD-MM-YYYY')}</td>
            <td>{appointment.location}</td>
            <td>{name}</td>
            <td>{appointment.nina? 'NINA' : (appointment.receipt? 'RECEIPT': 'DEFAULT')}</td>
            <td>
                <div className="form-group">
                    <div className="col-md-12">
                        <div className="btn-group" role="group">
                            {processing}
                        </div>
                    </div>
                </div>
            </td>
        </tr> )
    }
}

Appointment.contextTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.object
};
