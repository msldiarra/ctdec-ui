import {  GraphQLFloat, GraphQLList, GraphQLInt,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {  mutationWithClientMutationId } from 'graphql-relay';
import { DB }from '../database';
import {viewerType} from '../type/Types';
import _ from 'lodash';
import {getViewer} from '../store/UserStore';
import moment from 'moment';

export default mutationWithClientMutationId({
    name: 'AssignAppointmentToUser',
    inputFields: {
        viewerId: { type: new GraphQLNonNull(GraphQLString) },
        appointmentNumber: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLInt) }
    },
    outputFields: {
        viewer: {
            type: viewerType,
            resolve: ({viewerId}) => getViewer(viewerId),
        }
    },
    mutateAndGetPayload: ({viewerId, appointmentNumber, userId}) => {

        var user_appointment = {
            appointment_number: appointmentNumber,
            user_id: userId,
            start_date: moment()
        };

        return DB.models.user_appointment.create(user_appointment)
            .then(()  => {

            return {
                viewerId: viewerId
            };

        });
    }
});
