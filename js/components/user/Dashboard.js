import React from 'react';
import Relay from 'react-relay';
import Appointments from './Appointments'

class Dashboard extends React.Component {

    render() {
        return (
            <div className="">
                <div className="page-header row">

                </div>
                <Appointments appointments={this.props.viewer} />
                <br/>
                <footer className="text-center">&copy;2017 UL- L'Usine Logicielle</footer>
                <br/>
            </div>
        );
    }
}

Dashboard.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Relay.createContainer(Dashboard, {

    initialVariables: {reference: "", city :""},

    fragments: {
        viewer: ({reference, city}) => Relay.QL`
          fragment on Viewer {
               id
               ${Appointments.getFragment('appointments', {reference, city})}
          }
    `,
    }

});