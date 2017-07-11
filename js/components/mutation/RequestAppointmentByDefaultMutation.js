import Relay from 'react-relay';
import _ from 'lodash'


export default class RequestAppointmentByDefaultMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`mutation {requestAppointmentByDefaultMutation}`;
    }


    getVariables() {
        return {
            viewerId : this.props.viewerId,
            mail : this.props.mail,
            city : this.props.city,
            country : this.props.country,
            countryCode : this.props.countryCode,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            fatherFirstName: this.props.fatherFirstName,
            motherFirstName:  this.props.motherFirstName,
            motherLastName: this.props.motherLastName

        };
    }

    getFatQuery() {
        return Relay.QL`
          fragment on RequestAppointmentByDefaultPayload {
              viewer
          }
    `;
    }

    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    viewer: this.props.viewer.id
                }
            }
        ]
    }

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
    `,
    };

    getOptimisticResponse() {

        return {
            viewer: {
                id: this.props.viewer.id,
            }
        };
    }
}

