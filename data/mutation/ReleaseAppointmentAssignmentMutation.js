import {  GraphQLFloat, GraphQLList, GraphQLInt,  GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import {  mutationWithClientMutationId } from 'graphql-relay';
import { DB }from '../database';
import {viewerType} from '../type/Types';
import _ from 'lodash';
import {getViewer} from '../store/UserStore';
import moment from 'moment';

export default mutationWithClientMutationId({
    name: 'ReleaseAppointmentAssignment',
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

        return DB.models.user_appointment.findOne({where: {appointment_number: appointmentNumber, user_id: userId}})
            .then(user_appointment =>
                DB.models.user_appointment_end_date.create({
                    user_appointment_id: user_appointment.id,
                    end_date: moment()}
                )
            ).then(()  => {

            return {
                viewerId: viewerId
            };
        });


    }
});
