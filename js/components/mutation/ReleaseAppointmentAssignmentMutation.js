import Relay from 'react-relay';
import _ from 'lodash'


export default class ReleaseAppointmentAssignmentMutation extends Relay.Mutation {

    getMutation() {
        return Relay.QL`mutation {releaseAppointmentAssignmentMutation}`;
    }


    getVariables() {
        return {
            viewerId : this.props.viewerId,
            userId: this.props.userId,
            appointmentNumber : this.props.appointmentNumber
        };
    }

    getFatQuery() {
        return Relay.QL`
          fragment on ReleaseAppointmentAssignmentPayload {
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

