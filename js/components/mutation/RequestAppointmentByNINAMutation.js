import Relay from 'react-relay';
import _ from 'lodash'


export default class RequestAppointmentByNINAMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`mutation {requestAppointmentByNINAMutation}`;
    }


    getVariables() {
        return {
            viewerId : this.props.viewerId,
            nina : this.props.nina,
            phone : this.props.phone,
            mail : this.props.mail,
            city : this.props.city,
            country : this.props.country,
            countryCode : this.props.countryCode

        };
    }

    getFatQuery() {
        return Relay.QL`
          fragment on RequestAppointmentByNINAPayload {
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

