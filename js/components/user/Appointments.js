import React from 'react';
import Relay from 'react-relay';
import Appointment from './Appointment'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Appointments extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading :  false, status : 'PLANNED'} ;
        this.onScroll = this.onScroll.bind(this)

    }

    onScroll() {
        window.onscroll = () => {

            if(!this.state.loading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.setState({loading: true}, () => {
                    this.props.relay.setVariables({count: this.props.relay.variables.count + 50},
                        (readyState) => {
                            if (readyState.done) {
                                this.setState({loading: false})
                            }
                        })
                })
            }
        }
    }

    changeStatus(value) {
        this.setState({status: value},
            () => {this.props.relay.setVariables({status: value})});
    }

    componentDidMount() {
        this.onScroll();
    }

    render() {

        var requests = <div className="row">
            <div className="page-header col-xs-10 col-sm-10 col-md-6 center-block text-center opacity-54">
                <h1>Aucun rendez-vous en attente!</h1>
            </div>
        </div>;

        if(this.props.appointments.user.appointments.edges.length > 0) {
            var viewer = this.props.appointments;
            requests = this.props.appointments.user.appointments.edges.map(function (edge) {
                return <Appointment key={edge.node.id} viewer={viewer} appointment={edge.node}/>

            });

        }

        return (
            <div>
                <div className="" style={{height:'60px', lineHeight:'60px', verticalAlign:'middle'}}>
                    <div className="form-group col-xs-8 pull-right" >
                        <div className="btn-group btn-group-justified-custom" role="group" >
                            <div className="btn-group" role="group">
                                <button onClick={this.changeStatus.bind(this, 1)} type="button" className={"btn btn-default " + (this.state.status ==  'PLANNED'? "active" : "")} value="1">En attente de traitement</button>
                            </div>
                            <div className="btn-group" role="group">
                                <button onClick={this.changeStatus.bind(this, 2)} type="button" className={"btn btn-default " + (this.state.status ==  2? "PROCESSED" : "")} value="2">Document envoyé</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="row item" >
                        <table className="table table-condensed">
                            <thead>
                            <tr>
                                <th>Statut</th>
                                <th>Date</th>
                                <th>Lieu</th>
                                <th>Nom</th>
                                <th>Type</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {requests}
                            </tbody>
                        </table>
                    </div>
                </div>
                {this.state.loading &&
                <div className="text-center"><i className="fa fa-2x fa-spinner" /></div>
                }
            </div>
        );
    }
}

export default Relay.createContainer(Appointments, {

    initialVariables: {status: "", count: 50 },

    fragments: {
        appointments: () => Relay.QL`
          fragment on Viewer {
            id
            user {
                id
                appointments(status: $status, first: $count) {
                  edges {
                    node {
                      id
                      number
                      date
                      status
                      location
                      receipt
                      nina
                      firstName
                      lastName
                      fatherFirstName
                      motherFirstName
                      motherLastName
                    }
                  },
            }
            }
          }
    `,
    },
});